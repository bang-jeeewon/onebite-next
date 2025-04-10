import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // index.tsx 페이지 요청을 받았을 때, 페이지를 재생성하도록 설계

  try {
    await res.revalidate('/') // 어떤 페이지를 revalidate할 것인지, 어떤 페이지 재생성을 할 것인지
    return res.json({ revalidate: true })
  } catch (err) {
    console.error(err)
    res.status(500).send('Revalidation Failed')
  }
}
