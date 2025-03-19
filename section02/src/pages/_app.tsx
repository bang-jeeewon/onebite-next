import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link' // CSR방식으로 페이지 이동할 때 사용(a태그는 SSR방식)
import { useRouter } from 'next/router'

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

  return (
    <>
      <header>
        <Link href={'/'}>index</Link>
        &nbsp;
        <Link href={'/search'}>search</Link>
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
