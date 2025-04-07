// NOTE: (정적 경로)
import SearchableLayout from '@/components/searchable-layout'
import { ReactNode, useEffect, useState } from 'react'
import BookItem from '@/components/book-item'
import fetchBooks from '@/lib/fetch-books'
import { useRouter } from 'next/router'
import { BookData } from '@/types'

// /search?q=방지원 -> { pathname: '/search', query: { q: '방지원' } } 인데, 콘솔에 router를 찍어보면 2번 찍힘. 1번은 서버에서, 2번은 클라이언트에서 찍힘. 쿼리스트링을 읽는 중에 컴포넌트를 한 번 더 렌더링하기 때문. 그래서 첫번째는 query에 {} 빈 객체. 두번째 콘솔에는 { q: '방지원' }이 찍힘.

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   // context - 현재 브라우저로부터 받은 모든 정보가 포함되어있음
//   const q = context.query.q // GetStaticPropsContext' 형식에 'query' 속성이 없습니다.ts(2339)
//   // 빌드 타임에는 url의 query string을 알 수 없음. 사용자가 직접 입력하거나 사용자 작동이 필요함

//   const books = await fetchBooks(q as string)

//   return {
//     props: { books },
//   }
// }

// export default function Page({ books }: InferGetServerSidePropsType<typeof getServerSideProps>) {
export default function Page() {
  // 이렇게 SSR, SSG를 다 지우면 기본으로는 Static 페이지가 되는데, CSR에서 브라우저에서 직접 url의 query string을 가져와서 API를 호출하는 방식으로 동작함
  // pre-rendering에서는 페이지의 레이아웃 정도만 잡히고, 이 컴포넌트가 마운트된 이후에, 브라우저 측에서 직접 query string으로 검색어를 불러와서, Client Side 측에서 Rendering을 하게 되는 구조
  const [books, setBooks] = useState<BookData[]>([])
  const router = useRouter()
  const q = router.query.q

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string)
    setBooks(data)
  }
  useEffect(() => {
    if (q) {
      // 검색 결과를 불러오는 로직
      fetchSearchResult()
    }
  }, [q])

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
    // 브라우저 Network 탭을 보면, 가장 먼저 받은 html 문서의 Preview를 보면, 기본적인 레이아웃 정도만 잡혀있는걸 볼 수 있음. 검색 결과는 제외하고.
  )
}

Page.getLayout = function getLayout(page: ReactNode) {
  return <SearchableLayout> {page} </SearchableLayout>
}
