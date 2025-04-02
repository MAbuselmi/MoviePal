"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Plus, Check } from "lucide-react"

export default function RecommendationsPage() {
  const searchParams = useSearchParams()
  const recommendationType = searchParams.get("type") || "general"

  const [isLoading, setIsLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [watchlist, setWatchlist] = useState<number[]>([])

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data for recommendations
        const mockRecommendations = [
          {
            id: 1,
            title: "Inception",
            year: 2010,
            rating: 8.8,
            genres: ["Sci-Fi", "Action"],
            image: "/placeholder.svg?height=400&width=300",
          },
          {
            id: 2,
            title: "The Shawshank Redemption",
            year: 1994,
            rating: 9.3,
            genres: ["Drama"],
            image: "/placeholder.svg?height=400&width=300",
          },
          {
            id: 3,
            title: "The Dark Knight",
            year: 2008,
            rating: 9.0,
            genres: ["Action", "Crime"],
            image: "/placeholder.svg?height=400&width=300",
          },
          {
            id: 4,
            title: "Pulp Fiction",
            year: 1994,
            rating: 8.9,
            genres: ["Crime", "Drama"],
            image: "/placeholder.svg?height=400&width=300",
          },
          {
            id: 5,
            title: "Fight Club",
            year: 1999,
            rating: 8.8,
            genres: ["Drama"],
            image: "/placeholder.svg?height=400&width=300",
          },
          {
            id: 6,
            title: "Forrest Gump",
            year: 1994,
            rating: 8.8,
            genres: ["Drama", "Romance"],
            image: "/placeholder.svg?height=400&width=300",
          },
          {
            id: 7,
            title: "The Matrix",
            year: 1999,
            rating: 8.7,
            genres: ["Sci-Fi", "Action"],
            image: "/placeholder.svg?height=400&width=300",
          },
          {
            id: 8,
            title: "Goodfellas",
            year: 1990,
            rating: 8.7,
            genres: ["Crime", "Drama"],
            image: "/placeholder.svg?height=400&width=300",
          },
        ]

        setRecommendations(mockRecommendations)
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [recommendationType])

  const getRecommendationTitle = () => {
    switch (recommendationType) {
      case "mood":
        return "Mood-Based Recommendations"
      case "story":
        return "Story-Based Recommendations"
      case "rating":
        return "Based on Your Ratings"
      default:
        return "Recommended for You"
    }
  }

  const getRecommendationDescription = () => {
    switch (recommendationType) {
      case "mood":
        const positive = searchParams.get("positive")
        const negative = searchParams.get("negative")
        return `Based on your current mood (Positive: ${positive}/50, Negative: ${negative}/50)`
      case "story":
        const story = searchParams.get("story")
        const keywords = searchParams.get("keywords")
        const actors = searchParams.get("actors")
        const directors = searchParams.get("directors")

        let description = "Based on your preferences: "
        if (story) description += `Story: "${story.substring(0, 30)}${story.length > 30 ? "..." : ""}", `
        if (keywords) description += `Keywords: ${keywords}, `
        if (actors) description += `Actors: ${actors}, `
        if (directors) description += `Directors: ${directors}, `

        return description.slice(0, -2)
      case "rating":
        return "Based on movies you've rated highly"
      default:
        return "Personalized recommendations just for you"
    }
  }

  const toggleWatchlist = (movieId: number) => {
    if (watchlist.includes(movieId)) {
      setWatchlist(watchlist.filter((id) => id !== movieId))
    } else {
      setWatchlist([...watchlist, movieId])
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{getRecommendationTitle()}</h1>
          <p className="text-gray-400">{getRecommendationDescription()}</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Finding the perfect movies for you...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendations.map((movie) => (
              <Card key={movie.id} className="bg-black/40 border-gray-800 overflow-hidden movie-card">
                <div className="relative">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image
                      src={movie.image || "/placeholder.svg"}
                      alt={movie.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-2 right-2 rounded-full bg-black/60 ${
                      watchlist.includes(movie.id) ? "text-primary" : "text-white"
                    }`}
                    onClick={() => toggleWatchlist(movie.id)}
                  >
                    {watchlist.includes(movie.id) ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </Button>
                </div>
                <CardContent className="p-4">
                  <Link href={`/movie/${movie.id}`}>
                    <h3 className="font-semibold text-white hover:text-primary transition-colors truncate">
                      {movie.title}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-400 text-sm">{movie.year}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-secondary text-secondary mr-1" />
                      <span className="text-white text-sm">{movie.rating}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">{movie.genres.join(", ")}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && (
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Not finding what you're looking for?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/mood">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Try Mood-Based
                </Button>
              </Link>
              <Link href="/story">
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                  Try Story-Based
                </Button>
              </Link>
              <Link href="/rating">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  Rate More Movies
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

