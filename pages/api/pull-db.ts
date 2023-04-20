import type { NextApiRequest, NextApiResponse } from 'next'
import { firebase } from './_firebase'
import fs from 'fs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.VERCEL) return res.status(401).send('Unauthorized')

  const data = (
    await firebase.firestore().collection('registrations').get()
  ).docs.map((doc) => ({ ...doc.data(), id: doc.id }))

  // Write docs to a local file
  fs.writeFileSync('./db/registrations.json', JSON.stringify(data, null, 2))

  return res.status(200).json({ success: true, count: data.length })
}
