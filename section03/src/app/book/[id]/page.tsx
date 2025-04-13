export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <div>book/{id} page입니다</div>
}

// catch all segment : [...id] 이렇게 폴더를 만들면, /book/1/1 이런식의 url도 가능
// optional catch all segment [[...id]] 이렇게 폴더를 만들면, /book 같은 url도 가능
