import BookItem from '@/components/book-item'
import style from './page.module.css'
import books from '@/mock/books.json'

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  )
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

// Page Router 장점
// 1. 파일 기반으로 추가적인 코드 없이 라우팅을 할 수 있음
// 2. 다양한 사전 렌더링 옵션을 제공함

// Page Router 단점
// 1. 페이지별 레이아웃 설정이 번거롭다
// 2. 데이터 페칭이 페이지 컴포넌트에만 전달이 되기 때문에, 자식의 자식으로 내려보내려면 props drilling..
// 3. 불필요한 컴포넌트들(상호작용이 필요없는)도 JS Bundle에 포함된다 -> App Router에서는 React Server Component를 사용해서, 상호작용이 없는 컴포넌트를 따로 분리해서 JS Bundle에서 제외할 수 있음
//    컴포넌트가 서버에서 JS 실행될 때 한번, 브라우저에서 Hydration될 때 한번, 총 두번 실행됨
//    Hydration - HTML만 있는 페이지에 JS를 붙여주는 것(사용자와 상호작용이 가능한 페이지, useState로 사용자의 텍스트를 저장하는 페이지 컴포넌트)

// React Server Component 주의 사항
// 1. 서버 컴포넌트에는 브라우저에서 실행될 코드가 포함되면 안된다. (이벤트 핸들러, 리액트 훅, 브라우저에서 실행되는 기능을 담고 있는 라이브러리)
// 2. 클라이언트 컴포넌트는 클라이언트에서만 실행되지 않는다
// 3. 클라이언트 컴포넌트에서 서버 컴포넌트를 import 할 수 없다. (만약 클 > 서 로 import 해서 쓰면, 자동으로 Next.js는 해당 서버 컴포넌트(라고 개발자가 생각하는 컴포넌트)를 클라이언트 컴포넌트로 변환해버림
// 4. 서버 컴포넌트에서 클라이언트 컴포넌트에게 직렬화 되지 않는 Props는 전달 불가하다

// 직렬화(Serialization) : 객체, 배열, 클래스 등의 복잡한 구조의 데이터를 네트워크 상으로 전송하기 위해 아주 단순한 형태(문자열, Byte)로 변환하는 것. 근데 함수는 직렬화할 수 없음.
// 직렬화 After : {"name":"방지원","age":25}
// 사전 렌더링 과정 중에는 엄밀히 말하면, 서버 컴포넌트들만 먼저 따로 실행이 됨(RSC payload라는 json과 비슷한 데이터 결과물)
// RSC payload에는 서버 컴포넌트의 모든 데이터가 포함됨
// 서버 컴포넌트의 렌더링 결과, 연결된 클라이언트 컴포넌트의 위치, 클라이언트 컴포넌트에게 전달하는 props 값
// 그 이후에는 Client Component도 실행되어서, RSC payload와 합쳐져서 => HTML 페이지가 생성됨
// 근데 이 직렬화하는 과정에서, 부모인 서버 컴포넌트가 자식인 클라이언트 컴포넌트에 props로 함수를 전달하고 있다면, 함수도 직렬화되어서 RSC payload에 포함이 되어야 함. 근데 그게 안됨. 함수는 직렬화가 불가능하기 때문. Runtime Error 발생. Error: Function cannat be passed directly to Client Component.
// 그래서 서버 컴포넌트 > 클라이언트 컴포넌트 일 때, function은 Props로 전달 불가(직렬화 안됨)

// 네비게이팅
// App Router에서는 서버에서 브라우저로 JS Bundle을 보낼 때, 서버 컴포넌트 실행 결과물인 RSC payload도 같이 보냄
// JS Bundle에는 클라이언트 컴포넌트 정보만 포함됨
// RSC Payload에는 서버 컴포넌트 정보만 포함됨
// 그럼 브라우저는 위 두개를 받아서, JS를 실행해서 RSC Payload와 합쳐서 페이지 교체를 함
