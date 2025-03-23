// NOTE: (정적 경로)
import SearchableLayout from '@/components/searchable-layout'
import { useRouter } from 'next/router' // next/navigation은 app router에서 사용되는 패키지임. useRouter는 이름 그대로 router라는 객체를 컴포넌트 내부에서 사용할 수 있도록 반환해주는 함수임.
import { ReactNode } from 'react'

// /search?q=방지원 -> { pathname: '/search', query: { q: '방지원' } } 인데, 콘솔에 router를 찍어보면 2번 찍힘. 1번은 서버에서, 2번은 클라이언트에서 찍힘. 쿼리스트링을 읽는 중에 컴포넌트를 한 번 더 렌더링하기 때문. 그래서 첫번째는 query에 {} 빈 객체. 두번째 콘솔에는 { q: '방지원' }이 찍힘.

export default function Search() {
  const router = useRouter()
  const { q } = router.query

  return <h1>Search {q}</h1>
}

Search.getLayout = function getLayout(page: ReactNode) {
  return <SearchableLayout> {page} </SearchableLayout>
}
