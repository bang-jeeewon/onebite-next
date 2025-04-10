import { BookData } from '@/types'

export default async function fetchOneBook(id: number): Promise<BookData | null> {
  const url = `https://onebite-books-server-red-eight.vercel.app/book/${id}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error()
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching book:', error)
    return null
  }
}
