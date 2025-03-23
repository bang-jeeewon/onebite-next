import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import style from './searchable-layout.module.css'

export default function SearchableLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const q = router.query.q as string // 기본적으로 querystring이 여러 개일 수 있기 때문에, string | string[] | undefined로 타입이 정의되어 있음

  useEffect(() => {
    setSearch(q || '')
  }, [q])

  // NOTE: React에서 발생한 ChangeEvent인데, 어떤 태그냐면 HTMLInputElement 태그에서 발생한 change 이벤트
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSubmit = () => {
    if (!search || q === search) return // querystring이 검색어와 같을 경우 페이지 이동 X
    router.push(`/search?q=${search}`)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div>
      <div className={style.searchbar_container}>
        <input value={search} onKeyDown={onKeyDown} onChange={onChangeSearch} placeholder='검색어를 입력하세요 ...' />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  )
}
