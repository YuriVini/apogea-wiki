import { useEffect, useState } from 'react'

interface NewsItem {
  title: string
  author: string
  contents: string
}

interface NewsResponse {
  appnews: {
    appid: number
    newsitems: NewsItem[]
    count: number
  }
}

export const useGameNews = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=2796220&count=5&maxlength=500&format=json'
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }

        const data: NewsResponse = await response.json()
        const simplifiedNews = data.appnews.newsitems.map(({ title, author, contents }) => ({
          title,
          author,
          contents
        }))
        setNews(simplifiedNews)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return { news, loading, error }
}
