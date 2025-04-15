'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Searchbar() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSubmit = () => {
    router.push(`/search?q=${search}`)
  }

  return (
    <div>
      <input value={search} onChange={onChangeSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  )
}

// 특정 컴포넌트가 상호작용이 있어야 한다? -> 'use client'로 Client Component로 만들면 됨
// page.tsx나 layout.tsx가 아닌 이름은 그냥 JS, TS로 인식하기 때문에, /app 하단에 이런 컴포넌트 만들어도 된다 : Co-Location
