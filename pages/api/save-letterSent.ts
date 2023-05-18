import type { NextApiRequest, NextApiResponse } from 'next'
import { firebase } from './_firebase'
import { pick } from '../../src/utils/pick'
import registrations from '../../registrations.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.VERCEL) return res.status(401).send('Unauthorized')

  const db = firebase.firestore()
  const batch = db.batch()
  const registrationsCol = db.collection('registrations')

  let results: unknown[] = []

  registrations.map((entry, i) => {
    if (!entry.sentLetter) return
    const updatedFields = pick(entry, 'sentLetter')
    results.push([entry.id, updatedFields])

    batch.update(registrationsCol.doc(entry.id), updatedFields)
  })

  results.push(batch.commit())

  return res.status(200).json({ results, count: results.length })
}
