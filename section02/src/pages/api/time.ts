// 현재 시간을 반환하는 API

import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date()
  res.json({ time: date.toLocaleString() })
}
