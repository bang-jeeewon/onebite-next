import { Html, Head, Main, NextScript } from 'next/document'

/**
 * NOTE: 모든 페이지에 공통으로 적용되는 HTML 코드를 설정하는 컴포넌트
 * 기존의 리액트 앱의 index.html과 거의 비슷한 역할을 한다고 생각하면 됨
 * 모든 페이지에 적용해야 하는 메타 태그를 설정한다거나, 또는 폰트를 불러온다거나, 캐릭터셋을 설정한다거나, 구글 애널리틱스 같은 서드 파티 스크립트를 넣는다거나 등등의 페이지 전체에 다 적용되는
HTML 태그를 관리하기 위해 사용하면 된다고 이해하면 됨
 * @returns
 */
export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
