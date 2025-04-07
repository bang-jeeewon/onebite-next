// NOTE: (동적 경로) id라는 가변적인 값 즉 URL 파라미터를 갖는 동적 경로에 대응하는 파일
// NOTE: (범용적 경로) 만약에 [...id].tsx라면 여러개의 URL 파라미터를 갖는 동적 경로에 대응하는 파일. /book/1/2/3/4/5 이런식으로 여러개의 URL 파라미터를 갖는 동적 경로에 대응하는 파일 -> 'catch-all segment'
// [[...id]].tsx라면 catch-all segment도 되고, 동적 경로가 없는 그냥 일반 /book 이런 식의 경로도 대응할 수 있음 -> 'optional catch-all segment'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import style from './[id].module.css'
import fetchOneBook from '@/lib/fetch-one-book'

export const getStaticPaths = () => {
  return {
    // url parameter 값은 반드시 문자열로 설정해줘야 함
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
    fallback: false, // 묻고 따지지 않고, 존재하지 않는 페이지는 notfound 페이지를 반환함
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id // undefined이 아닐거다

  const book = await fetchOneBook(Number(id))

  return {
    props: { book },
  }
}

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!book) return '문제가 발생했습니다 다시 시도하세요' // book이 catch의 null일 경우

  const { title, subTitle, description, author, publisher, coverImgUrl } = book

  return (
    <div className={style.container}>
      <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
        <img src={coverImgUrl} />
      </div>

      <div className={style.title}> {title} </div>
      <div className={style.subTitle}> {subTitle} </div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}> {description} </div>
    </div>
  )
}

// book/1 or book/2 or book/3 or book/100 -> 동적으로 여러 개의 페이지를 렌더링할 수 있음
// 이렇게 동적으로 url이 바뀔 수 있으면, 사전렌더링을 하기 전에, 미리 어떤 url이 있을 수 있는지, 경로 설정해주는 걸 추가해야 함 (getStaticPaths)
// book/1.html, book/2.html, book/3.html, book/100.html -> 이렇게 사전렌더링을 할 수 있음
// 그리고나서 빌드가 종료된 이후에, 브라우저가 book/1로 요청을 하면, 앞서 만들어두었던 book/1.html를 반환하게 하는 동작을 함
