"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, SkipForward, ArrowLeft } from "lucide-react"

export default function RatingPage() {
  const router = useRouter()

  // Mock data for movies to rate
  const [movies, setMovies] = useState([
    { id: 1, title: "The Shawshank Redemption", year: 1994, image: "/placeholder.svg?height=600&width=400" },
    { id: 2, title: "The Godfather", year: 1972, image: "/placeholder.svg?height=600&width=400" },
    { id: 3, title: "The Dark Knight", year: 2008, image: "/placeholder.svg?height=600&width=400" },
    { id: 4, title: "Pulp Fiction", year: 1994, image: "/placeholder.svg?height=600&width=400" },
    { id: 5, title: "Fight Club", year: 1999, image: "/placeholder.svg?height=600&width=400" },
    { id: 6, title: "Inception", year: 2010, image: "/placeholder.svg?height=600&width=400" },
    { id: 7, title: "The Matrix", year: 1999, image: "/placeholder.svg?height=600&width=400" },
    { id: 8, title: "Goodfellas", year: 1990, image: "/placeholder.svg?height=600&width=400" },
    { id: 9, title: "The Silence of the Lambs", year: 1991, image: "/placeholder.svg?height=600&width=400" },
    { id: 10, title: "Interstellar", year: 2014, image: "/placeholder.svg?height=600&width=400" },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [ratings, setRatings] = useState<Record<number, number>>({})
  const [hoveredRating, setHoveredRating] = useState(0)
  const [ratingHistory, setRatingHistory] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleRate = (movieId: number, rating: number) => {
    setRatings({
      ...ratings,
      [movieId]: rating,
    })
    setRatingHistory([...ratingHistory, currentIndex])

    if (currentIndex < movies.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setHoveredRating(0)
    } else {
      handleFinish()
    }
  }

  const handleSkip = () => {
    if (currentIndex < movies.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setHoveredRating(0)
    } else {
      handleFinish()
    }
  }

  const handleUndo = () => {
    if (ratingHistory.length > 0) {
      const prevIndex = ratingHistory[ratingHistory.length - 1]
      const newRatings = { ...ratings }
      delete newRatings[movies[prevIndex].id]

      setRatings(newRatings)
      setCurrentIndex(prevIndex)
      setRatingHistory(ratingHistory.slice(0, -1))
      setHoveredRating(0)
    }
  }

  const handleFinish = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to recommendations page with rating data
      router.push(`/recommendations?type=rating`)
    } catch (error) {
      console.error("Error submitting ratings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const currentMovie = movies[currentIndex]
  const progress = (currentIndex / movies.length) * 100

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Rate Movies</h1>
            <p className="text-gray-400">Rate movies you've watched to get better recommendations</p>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>
                {currentIndex} of {movies.length}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </div>

          <Card className="bg-black/60 border-gray-800 overflow-hidden">
            <div className="relative aspect-[2/3] overflow-hidden">
              <Image
                src={currentMovie.image || "/placeholder.svg"}
                alt={currentMovie.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-1">{currentMovie.title}</h2>
              <p className="text-gray-400 mb-6">{currentMovie.year}</p>

              <div className="rating-container flex justify-center mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="star p-1"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => handleRate(currentMovie.id, star)}
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || ratings[currentMovie.id] || 0)
                          ? "fill-secondary text-secondary"
                          : "text-gray-500"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUndo}
                  disabled={ratingHistory.length === 0 || isLoading}
                  className="border-gray-700 text-gray-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Undo
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSkip}
                  disabled={isLoading}
                  className="border-gray-700 text-gray-300"
                >
                  Skip
                  <SkipForward className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {Object.keys(ratings).length > 0 && (
            <div className="mt-6 text-center">
              <Button onClick={handleFinish} className="bg-primary hover:bg-primary/90 text-white" disabled={isLoading}>
                {isLoading ? "Processing..." : "Finish & Get Recommendations"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

