// NOTE: (정적 경로)
import SearchableLayout from '@/components/searchable-layout'
import { ReactNode } from 'react'
import BookItem from '@/components/book-item'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import fetchBooks from '@/lib/fetch-books'

// /search?q=방지원 -> { pathname: '/search', query: { q: '방지원' } } 인데, 콘솔에 router를 찍어보면 2번 찍힘. 1번은 서버에서, 2번은 클라이언트에서 찍힘. 쿼리스트링을 읽는 중에 컴포넌트를 한 번 더 렌더링하기 때문. 그래서 첫번째는 query에 {} 빈 객체. 두번째 콘솔에는 { q: '방지원' }이 찍힘.

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // context - 현재 브라우저로부터 받은 모든 정보가 포함되어있음
  const q = context.query.q

  const books = await fetchBooks(q as string)

  return {
    props: { books },
  }
}

export default function Page({ books }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactNode) {
  return <SearchableLayout> {page} </SearchableLayout>
}
