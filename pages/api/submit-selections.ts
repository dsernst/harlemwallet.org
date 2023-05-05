import type { NextApiRequest, NextApiResponse } from 'next'
import { firebase } from './_firebase'
import { sendEmail } from './_sendgrid'

export type RegisterReqBody = {
  name: string
  mailing_address: string
  email: string
}
export type RegisterResp = { success: true } | { error: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<RegisterResp>) {
  const { authCode, votes } = req.body

  const doc = (await firebase.firestore().collection('registrations').where('authCode', '==', authCode).get()).docs[0]
  if (!doc) {
    const errorMsg = `Hmmm, your auth code '${authCode}' was not found`

    await sendEmail({
      to: 'submission@harlemwallet.org',
      subject: 'Error w/ Harlem Wallet Submission',
      body: `${errorMsg}\n\n${JSON.stringify(votes)}`,
    })
    return res.status(401).json({ error: errorMsg })
  }

  const user = {
    ...(doc.data() as { name: string; email: string; mailing_address: string; submission: unknown[] }),
    id: doc.id,
  }

  await Promise.all([
    // Store in DB
    firebase
      .firestore()
      .collection('registrations')
      .doc(user.id)
      .update({ submission: [...(user.submission || []), { createdAt: new Date(), votes, headers: req.headers }] }),

    // Notify admin
    // sendEmail({
    //   to: 'submission@harlemwallet.org',
    //   subject: 'Harlem Wallet: Submission',
    //   body: `${user.name} - ${user.email}\n\n\n${user.mailing_address}`,
    // }),
  ])

  return res.status(201).json({ success: true })
}
