import type { NextApiRequest, NextApiResponse } from 'next'
import { firebase } from './_firebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(401).json({ error: 'Forbidden' })

  const docs = await firebase.firestore().collection('registrations').get()

  // const data = docs.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // }))

  return res.status(200).json({ count: docs.docs.length })
}
