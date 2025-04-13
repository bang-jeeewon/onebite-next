import styles from './page.module.css'

export default function Home() {
  return <div className={styles.page}>인덱스 페이지</div>
}

// App router의 기능인 Route Group(라우트 그룹) : 폴더명을 소괄호로 감싸면
// 라우트 경로 상에는 아무런 영향을 주지 않고, 각기 다른 페이지에 공통으로 적용할 수 있는 레이아웃을 만들 수 있음. 레이아웃만 동일하게.
