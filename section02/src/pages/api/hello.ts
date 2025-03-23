// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' })
}

// api/hello.ts 파일은 /api/hello 경로로 접근할 수 있는 API 엔드포인트를 정의한 파일

// API 구축할 수 있게 해주는 API Routes
// 마치 백엔드 API 서버가 하는 일과 동일하게 브라우저로부터 요청을 받아 DB에서 데이터를 꺼내온다든가, 아니면 또 다른 서드파티에서 데이터를 불러와서 전달을 해준다던지
