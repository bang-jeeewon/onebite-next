// /search/* : /search 하단에 모든 페이지에 공통으로 감싸는 레이아웃
// 만약 /search/setting/layout.tsx 가 하나 더 있다면, 레이아웃이 자동으로 중첩되어서 적용됨
import { ReactNode } from 'react'
import Searchbar from '../../components/searchbar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  )
}
