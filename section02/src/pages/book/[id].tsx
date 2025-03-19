// NOTE: (동적 경로) id라는 가변적인 값 즉 URL 파라미터를 갖는 동적 경로에 대응하는 파일
// NOTE: (범용적 경로) 만약에 [...id].tsx라면 여러개의 URL 파라미터를 갖는 동적 경로에 대응하는 파일. /book/1/2/3/4/5 이런식으로 여러개의 URL 파라미터를 갖는 동적 경로에 대응하는 파일 -> 'catch-all segment'
// [[...id]].tsx라면 catch-all segment도 되고, 동적 경로가 없는 그냥 일반 /book 이런 식의 경로도 대응할 수 있음 -> 'optional catch-all segment'

import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  const { id } = router.query // 만약 catch-all segment라면 id가 배열로 반환됨
  return <h1>Book {id}</h1>
}
