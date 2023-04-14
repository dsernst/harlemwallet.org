import type { NextApiRequest, NextApiResponse } from 'next'
import registrations from '../../db/registrations.json'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const emailCount = new Map()
  const nameCount = new Map()
  const addressCount = new Map()
  let count = 0
  let dupesFound = 0

  // Count # of times each email is seen
  registrations.forEach(({ email, name, mailing_address: addr }) => {
    const prevEmail = emailCount.get(email)
    const prevName = nameCount.get(name)
    const prevAddr = addressCount.get(addr)
    if (prevEmail || prevName || prevAddr) dupesFound++

    emailCount.set(email, (prevEmail || 0) + 1)
    nameCount.set(name, (prevName || 0) + 1)
    addressCount.set(addr, (prevAddr || 0) + 1)
    count++
  })

  return res.status(200).json({
    count,
    dupesFound,
    emailCount: Object.fromEntries(emailCount),
    nameCount: Object.fromEntries(nameCount),
    addressCount: Object.fromEntries(addressCount),
  })
}
