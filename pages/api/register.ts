import type { NextApiRequest, NextApiResponse } from 'next'
import { firebase } from './_firebase'
import { sendEmail } from './_sendgrid'

export type RegisterReqBody = {
  name: string
  mailing_address: string
  email: string
}
export type RegisterResp = {
  success: true
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResp>
) {
  const { name, mailing_address, email } = req.body

  const id = new Date().toISOString() + ' ' + String(Math.random()).slice(2, 7)

  // // Wait 1 second (for testing)
  // await new Promise((done) => setTimeout(() => done(void 4), 1000))

  await Promise.all([
    // Store in DB
    firebase
      .firestore()
      .collection('registrations')
      .doc(id)
      .set({ id, name, mailing_address, email, headers: req.headers }),

    // Notify admin
    sendEmail({
      to: 'new-registration@harlemwallet.org',
      subject: 'Harlem Wallet: Registration',
      body: `${name} - ${email}\n\n\n${mailing_address}`,
    }),
  ])

  return res.status(200).json({ success: true })
}
