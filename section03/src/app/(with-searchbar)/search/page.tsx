// 이 컴포넌트가 React의 Server Component이기 때문에 async await를 사용할 수 있음
// 서버에서 사전 렌더링을 위해서 딱 한 번 실행이 됨

import ClientComponent from '@/components/client-component'

// 서버 컴포넌트 (RSC Payload) search?_rsc=erfjf
export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  return (
    <div>
      Search 페이지 : {q}
      {/* 이 클라이언트 컴포넌트와 (JS Bundle) page.js */}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  )
}

// 이 페이지로 이동했을 때, Fetch/XHR로 확인해보면 search?_rsc=g234f 이런식으로 RSC Payload가 브라우저가 받은게 보이고, Preview로 보면 데이터들이 직렬화 되어있는걸 볼 수 있음

// /search 페이지에서 /페이지와 /book/1페이지의 rsc payload를 미리 pre-fetching한 걸 볼 수 있고, (with-searchbar)/page(인덱스 /페이지)의 js bundle도 pre-fetching한 걸 볼 수 있음

// 근데 왜 인덱스 페이지는 rsc payload, js bundle 둘 다 pre-fetching이 되는데,
// book/1 페이지는 rsc payload만 pre-fetching이 되는걸까?
// 이유는 나중에 배우지만
// /페이지는 static 렌더링이지만(데이터 업데이트가 필요하지 않기 때문에 RSC payload, JS Bundle), /book/1페이지는 dynamic 렌더링이기 때문임(데이터 업데이트가 필요할 수 있으니까 일단 이 페이지는 RSC payload만 받고, JS Bundle은 실제 페이지 이동이 발생했을 때 받아옴)
// 동적 경로 페이지는 url에서 query를 꺼내 쓰기 때문에, 자동으로 dynamic 렌더링을 함 Next.js가
