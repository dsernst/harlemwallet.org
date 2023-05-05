import type { NextApiRequest, NextApiResponse } from 'next'
import { firebase } from './_firebase'
import { sendEmail } from './_sendgrid'
import { creditsPerVoter } from '../../src/qv-interface/QVInterface'
import { projects } from '../../src/projects'

export type RegisterReqBody = {
  name: string
  mailing_address: string
  email: string
}
export type RegisterResp = { success: true } | { error: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<RegisterResp>) {
  const { authCode, votes } = req.body as { votes: number[]; authCode: string }

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

  const quadraticVotes = votes.map((itemVote, _) => itemVote ** 2)
  const totalQVUsed = quadraticVotes.reduce((a, b) => a + b, 0)
  const creditsRemaining = creditsPerVoter - totalQVUsed

  const previousSubmissions = user.submission || []
  const formattedVotes = votes.reduce((acc, vote, i) => {
    if (!vote) return acc
    return acc + `${projects[i][0]}: +${vote}\n`
  }, ``)

  await Promise.all([
    // Store in DB
    firebase
      .firestore()
      .collection('registrations')
      .doc(user.id)
      .update({ submission: [...previousSubmissions, { createdAt: new Date(), votes, headers: req.headers }] }),

    // Notify admin
    sendEmail({
      to: ['david@siv.org'],
      subject: `Harlem Wallet Submission: ${user.name}`,
      body: `${user.name} - Submission #${previousSubmissions.length + 1}

${formattedVotes}
Remaining QV Credits: ${creditsRemaining} / ${creditsPerVoter}`.replaceAll('\n', '<br />'),
    }),
  ])

  return res.status(201).json({ success: true })
}
