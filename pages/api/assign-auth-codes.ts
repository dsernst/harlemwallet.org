import type { NextApiRequest, NextApiResponse } from 'next'
import { firebase } from './_firebase'
// import registrations from '../../db/registrations.json'
import registrations from '../../registrations.sample.json' // Replace with commented out above to run locally

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.VERCEL) return res.status(401).send('Unauthorized')

  const db = firebase.firestore()
  const batch = db.batch()
  const registrationsCol = db.collection('registrations')

  let results: unknown[] = []

  registrations.map((entry, i) => {
    if (!entry.lobAddress) return
    if (entry.authCode) return

    const initials = entry.name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()

    // Random 4-digit number, between 1000 - 9999
    const random = Math.floor(Math.random() * 9000) + 1000

    const authCode = `${initials}-${random}`
    results.push([i, entry.id, authCode])

    batch.update(registrationsCol.doc(entry.id), { authCode })
  })

  batch.commit()

  return res.status(200).json({ results, count: results.length })
}
