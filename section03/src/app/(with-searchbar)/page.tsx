import styles from './page.module.css'

export default function Home() {
  return <div className={styles.page}>인덱스 페이지</div>
}

// App router의 기능인 Route Group(라우트 그룹) : 폴더명을 소괄호로 감싸면
// 라우트 경로 상에는 아무런 영향을 주지 않고, 각기 다른 페이지에 공통으로 적용할 수 있는 레이아웃을 만들 수 있음. 레이아웃만 동일하게.

// App Router의 가장 핵심 기능 : React Server Component
// 서버측에서만 실행되는 컴포넌트 (브라우저에서 실행 X)
// 컴포넌트가 서버측에서만 실행되는게 뭐야??

// 서버 컴포넌트가 왜 세상에 나온걸까?
// 기존의 Page Router에서는 어떤 문제가 있었을까?
// 상호작용이 필요한 컴포넌트도 있지만, 상호작용이 없어서(Hydration이 필요 없는) 컴포넌트도 있음
// 상호작용이 필요없는 페이지는 : 굳이 브라우저 측에서 한 번 더 실행될 필요가 전혀 없음
// 그래서 Page Router에서는 JS Bundle에 = 상호작용이 필요한 + 상호작용이 필요없는 컴포넌트까지 다 전달을 했었는데, JS Bundle 용량이 쓸데없이 커지고, 불러오는데 시간도 오래 걸리고, Hydration도 오래 걸림(TTI 늦어짐)
// 그러면 JS Bundle에서 제외시키면 되겠지
// 그래서 Server Component + Client Component = JS Bundle
// Server Component : 서버측에서 사전 렌더링을 진행할 떄 딱 한번만 실행 됨
// Client Component : 사전 렌더링 진행할 때 한번, 하이드레이션 진행할 때 한번 총 2번 실행
// 그래서 공식문서에서는 페이지의 대부분을 서버 컴포넌트로 구성할 것을 권장.
