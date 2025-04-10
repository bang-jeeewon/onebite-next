import { BookData } from '@/types'

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const url = `https://onebite-books-server-red-eight.vercel.app/book/random`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error()
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching random books:', error)
    return []
  }
}
