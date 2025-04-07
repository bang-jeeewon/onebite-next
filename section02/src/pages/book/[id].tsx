// NOTE: (동적 경로) id라는 가변적인 값 즉 URL 파라미터를 갖는 동적 경로에 대응하는 파일
// NOTE: (범용적 경로) 만약에 [...id].tsx라면 여러개의 URL 파라미터를 갖는 동적 경로에 대응하는 파일. /book/1/2/3/4/5 이런식으로 여러개의 URL 파라미터를 갖는 동적 경로에 대응하는 파일 -> 'catch-all segment'
// [[...id]].tsx라면 catch-all segment도 되고, 동적 경로가 없는 그냥 일반 /book 이런 식의 경로도 대응할 수 있음 -> 'optional catch-all segment'

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import style from './[id].module.css'
import fetchOneBook from '@/lib/fetch-one-book'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id // undefined이 아닐거다

  const book = await fetchOneBook(Number(id))

  return {
    props: { book },
  }
}

export default function Page({ book }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
