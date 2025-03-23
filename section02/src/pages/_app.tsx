import '@/styles/globals.css'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import GlobalLayout from '@/components/global-layout'
import { ReactNode } from 'react'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode
}

/**
 * 루트 컴포넌트
 * 모든 페이지 컴포넌트의 부모 역할을 하는 컴포넌트
 * 전체 페이지에 공통으로 적용되는 헤더나, 레이아웃을 렌더링할 수 있음
 * @param Component : 페이지 컴포넌트
 * @param pageProps : 페이지 컴포넌트에 전달되는 props
 */
export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout
}) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page)

  return (
    <>
      <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
    </>
  )
}

// NOTE: pre-fetching: 이동할 가능성이 있는 모든 페이지들을 사전에 미리 다 불러놓는 기능. 데이터도 미리 다 불러옴.
// 근데 Next.js는 이미 맨 처음에 서버가 브라우저에게 사전 렌더링으로 보내주고 후속으로 JS Bundle을 보내주기 때문에 브라우저 측에서 CSR 방식으로 페이지 교체를 하는데, 그니까 브라우저가 서버에 추가적으로 요청을 하는게 없는 걸로 이미 알고 있는데, 왜 pre-fetching 같은 기능이 필요한 걸까 의문
// JS Bundle 파일을 전달할 때 현재 페이지에 필요한 JS Bundle만 전달 된다고 생각하면 됨. ex) "/search" 접속 요청 -> Search JS Bundle
// 만약 모든 페이지의 번들파일을 전달할 경우 용량이 너무 커지며 hydration이 늦어진다
// 그러면 페이지 이동 때마다 필요한 JS Bundle을 새로 불러와야 되는거냐
// 그래서 pre-fetching
// 컴포넌트에 연결된 모든 페이지들의 JS 코드를 미리 불러오기 때문에 CSR처럼 빠른 페이지 이동이 가능
// 페이지 이동 시마다 Network 탭에서 해당 JS 파일을 불러오는 것을 확인할 수 있음 (search.js)
// npm run dev로 개발 모드로 실행하면 pre-fetching 동작 X
// npm run build && npm run start로 빌드 후 프로덕션 모드로 실행하면 pre-fetching 동작 O
// Network 탭에서 관련 페이지 JS 번들 파일을 미리 불러오는 것을 확인할 수 있음. 그래서 만약에 /search 페이지로 이동한다고 해도 Network 탭에서 새로운 요청이 없음
// 근데 Link가 아닌 onClickButton 같은 함수로 페이지 이동 로직을 해놓으면 pre-fetching이 동작하지 않음
// 만약 pre-fetching을 하고 싶으면 App 컴포넌트 마운트 될 때, router에 prefetch를 해놓으면 됨

// NOTE: 페이지별 레이아웃 잡는 방법
// 어떤 컴포넌트에서 요청이 오든 App 컴포넌트로 먼저 들어오는데
// 그 페이지를 가리키는 컴포넌트를 Component라는 props로 전달을 받아서 렌더링을 함
// 근데 그 페이지 컴포넌트도 '함수'라서 메서드를 추가할 수 있음
// 그 메서드를 통해, 그 페이지에서만 사용되는 레이아웃을 Component와 같이 전달할 수 있음
