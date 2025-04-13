// 이 컴포넌트가 React의 Server Component이기 때문에 async await를 사용할 수 있음
// 서버에서 사전 렌더링을 위해서 딱 한 번 실행이 됨

export default async function Page({ searchParams }: { searchParams: { q?: string } }) {
  return <div>Search 페이지 : {searchParams.q}</div>
}
