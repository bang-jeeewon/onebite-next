// import './index.css' // App 컴포넌트가 아닌 다른 데서 global css를 import 할 수 없음
// NOTE: CSS Module을 사용하면, css class에 유니크한 해시값을 붙여주기 때문에 global css를 import할 수 있음
import { ReactNode } from 'react'
import style from './index.module.css'
import SearchableLayout from '@/components/searchable-layout'

export default function Home() {
  return (
    <>
      <h1 className={style.h1}>인덱스</h1>
      <h2 className={style.h2}>H2</h2>
    </>
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
