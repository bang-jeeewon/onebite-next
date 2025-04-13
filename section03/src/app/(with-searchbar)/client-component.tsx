'use client'

import { ReactNode } from 'react'
// import ServerComponent from './server-component'

// export default function ClientComponent() {
//   console.log('클라이언트 컴포넌트')
//   return <ServerComponent />
// }

// children으로 받아서 쓰면 ServerComponent의 서버 컴포넌트 속성을 지킬 수 있음
// 그냥 props로 전달 받아서 렌더링만 하면 되기 때문에
export default function ClientComponent({ children }: { children: ReactNode }) {
  console.log('클라이언트 컴포넌트')
  return <div>{children}</div>
}
