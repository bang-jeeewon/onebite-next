import { BookData } from '@/types'

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = `https://onebite-books-server-red-eight.vercel.app/book`

  if (q) {
    url += `/search?q=${q}`
  }

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error()
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching books:', error)
    return []
  }
}
