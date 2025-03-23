import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link' // CSR방식으로 페이지 이동할 때 사용(a태그는 SSR방식)
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * 루트 컴포넌트
 * 모든 페이지 컴포넌트의 부모 역할을 하는 컴포넌트
 * 전체 페이지에 공통으로 적용되는 헤더나, 레이아웃을 렌더링할 수 있음
 * @param Component : 페이지 컴포넌트
 * @param pageProps : 페이지 컴포넌트에 전달되는 props
 */
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const onClickButton = () => {
    router.push('/test') // CSR방식으로 페이지 이동
    // 컴포넌트 내부에서 특정 조건이 만족했다거나 useEffect를 통해서 어떠한 상황을 가정한다거나 했을 때, 이런식으로 함수 내부에서도 페이지를 CSR방식으로 이동할 수 있음.
    router.replace('/test') // 이전 페이지를 스택에서 제거하고 이동. 뒤로가기 버튼을 눌렀을 때 이전 페이지로 이동하지 않음.
  }

  useEffect(() => {
    router.prefetch('/test') // pre-fetching: 이동할 가능성이 있는 모든 페이지들을 사전에 미리 다 불러놓는 기능. 데이터도 미리 다 불러옴.
  }, [])

  return (
    <>
      <header>
        {/* Next.js 네비게이션 */}
        <Link href={'/'}>index</Link>
        &nbsp;
        {/* prefetch false로 주면 이 페이지 JS는 Pre-fetching이 되지 않음 */}
        <Link href={'/search'} prefetch={false}>
          search
        </Link>
        &nbsp;
        <Link href={'/book/1'}>book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  )
}

// pre-fetching: 이동할 가능성이 있는 모든 페이지들을 사전에 미리 다 불러놓는 기능. 데이터도 미리 다 불러옴.
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
