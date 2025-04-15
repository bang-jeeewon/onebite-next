'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import style from './searchbar.module.css'

export default function Searchbar() {
  const router = useRouter()
  const searchParams = useSearchParams() // 현재 페이지의 query string을 꺼내올 수 있음
  const [search, setSearch] = useState('')

  const q = searchParams.get('q')

  useEffect(() => {
    setSearch(q || '')
  }, [q])

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSubmit = () => {
    if (!search || q === search) return
    router.push(`/search?q=${search}`)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div className={style.container}>
      <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
      <button onClick={onSubmit}>검색</button>
    </div>
  )
}

// 특정 컴포넌트가 상호작용이 있어야 한다? -> 'use client'로 Client Component로 만들면 됨
// page.tsx나 layout.tsx가 아닌 이름은 그냥 JS, TS로 인식하기 때문에, /app 하단에 이런 컴포넌트 만들어도 된다 : Co-Location
