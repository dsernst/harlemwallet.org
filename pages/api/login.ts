import type { NextApiRequest, NextApiResponse } from 'next'
import { firebase } from './_firebase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { auth } = req.body

  const docs = await firebase.firestore().collection('registrations').where('authCode', '==', auth).get()
  const users = docs.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as { name: string }),
  }))
  if (!users.length) return res.status(401).json({ error: 'User not found' })

  return res.status(200).json({ authCode: auth, name: users[0].name })
}
