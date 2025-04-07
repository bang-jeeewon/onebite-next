// import './index.css' // App 컴포넌트가 아닌 다른 데서 global css를 import 할 수 없음
// NOTE: CSS Module을 사용하면, css class에 유니크한 해시값을 붙여주기 때문에 global css를 import할 수 있음
import { ReactNode } from 'react'
import style from './index.module.css'
import SearchableLayout from '@/components/searchable-layout'
import BookItem from '@/components/book-item'
import { InferGetStaticPropsType } from 'next'
import fetchBooks from '@/lib/fetch-books'
import fetchRandomBooks from '@/lib/fetch-random-books'

/**
 * 약속된 함수 이름인 getServerSideProps를 만들어서 export 해주면 SSR로 동작하게 됨
 * Home 컴포넌트보다 먼저 실행되어서
 * 필요한 데이터를 또 다른 서버로부터 불러온다던가 하는 기능을 하는 함수
 * pre-rendering하는 과정에서 딱 한번만 실행이 될 것이기 때문에, 서버측에서 실행되는 함수라는걸 알고있어야 함
 */
export const getStaticProps = async () => {
  console.log('getStaticProps') // npm run dev로 개발모드로 실행을 하면, 마치 SSR처럼 요청이 올 때마다 계속 페이지를 만드는 것처럼, 개발자 편의를 위해 그렇게 설계 되어있음
  // 페이지 역할하는 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수

  // 직렬로, 두 API를 차례로 호출
  // const allBooks = await fetchBooks()
  // const recoBooks = await fetchRandomBooks()

  // 병렬로, 두 API를 동시에 호출
  const [allBooks, recoBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()])

  return {
    props: { allBooks, recoBooks },
  }
}

// Next.js에서 제공하는 알아서 타입을 추론해주는 InferGetServerSidePropsType
export default function Home({ allBooks, recoBooks }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  )
}

// NOTE: Next.js에서는 페이지별로 CSS가 겹치는 문제를 원천 차단하기 위해서, global css(import './index.css')를 사용할 수 없음
// 반드시 CSS Module을 사용해야 함

// 페이지 역할을 하는 page를 받아와서 SearchableLayout 레이아웃으로 묶어서 반환해주는 역할
// Home이라는 function에 getLayout이라는 메서드를 추가
// JavaScript의 모든 함수는 객체
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}

// SSG : 빌드 타임에 미리 백엔드 서버로부터 데이터 페칭을 마치고, 매번 똑같은 페이지만 응답함. 최신 데이터 반영은 어렵다. 하지만 매우 빠름. 사용자 경험 좋음. 굉장히 빠른 속도로 화면이 보여짐. 아무리 새로고침을 해도 빌드 이후에는 다시 페이지가 생성되지 않도록 설계되어있음. 서버측 터미널에 아무런 콘솔 로그가 찍히지 않음.

// Static : 'getStaticProps'나 'getServerSideProps'를 사용하지 않은, 페이지로 만들었지만 아무런 설정을 해주지 않은 페이지. -> Next.js에서는 기본값으로 미리 빌드 타임에 미리 사전 렌더링하도록 함. 그냥 SSG랑 동일하게 동작한다고 생각하면 됨. default pre-rendering Next.js Page

// Dynamic : SSR로 데이터 페칭을 하는 페이지
