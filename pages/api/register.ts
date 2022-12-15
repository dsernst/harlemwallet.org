import type { NextApiRequest, NextApiResponse } from 'next'

export type RegisterReqBody = {
  name: string
  mailing_address: string
  email: string
}
export type RegisterResp = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResp>
) {
  console.log(req.body)

  res.status(200).json({ name: 'John Doe' })
}
