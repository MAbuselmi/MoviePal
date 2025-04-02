"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, Heart, Clock, Play, Plus, Check, BarChart3, User, Users } from "lucide-react"

export default function MoviePage({ params }: { params: { id: string } }) {
  const [inWatchlist, setInWatchlist] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [userRating, setUserRating] = useState<number | null>(null)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)

  // Mock movie data
  const movie = {
    id: Number.parseInt(params.id),
    title: "Inception",
    year: 2010,
    duration: "2h 28m",
    rating: 8.8,
    genres: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"],
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    image: "/placeholder.svg?height=600&width=400",
    backdrop: "/placeholder.svg?height=1080&width=1920",
    panas: {
      positive: {
        interested: 4,
        excited: 5,
        strong: 3,
        enthusiastic: 4,
        proud: 2,
        alert: 5,
        inspired: 4,
        determined: 4,
        attentive: 5,
        active: 4,
      },
      negative: {
        distressed: 3,
        upset: 2,
        guilty: 1,
        scared: 3,
        hostile: 2,
        irritable: 1,
        ashamed: 1,
        nervous: 4,
        jittery: 3,
        afraid: 3,
      },
    },
    similarMovies: [
      { id: 2, title: "The Matrix", year: 1999, rating: 8.7, image: "/placeholder.svg?height=400&width=300" },
      { id: 3, title: "Interstellar", year: 2014, rating: 8.6, image: "/placeholder.svg?height=400&width=300" },
      { id: 4, title: "The Prestige", year: 2006, rating: 8.5, image: "/placeholder.svg?height=400&width=300" },
      { id: 5, title: "Memento", year: 2000, rating: 8.4, image: "/placeholder.svg?height=400&width=300" },
    ],
  }

  const handleToggleWatchlist = () => {
    setInWatchlist(!inWatchlist)
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleRateMovie = (rating: number) => {
    setUserRating(rating)
  }

  const handleSubmitReview = async () => {
    if (!reviewText.trim()) return

    setIsSubmittingReview(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset form after successful submission
      setReviewText("")
      alert("Review submitted successfully!")
    } catch (error) {
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmittingReview(false)
    }
  }

  // Calculate total PANAS scores
  const totalPositive = Object.values(movie.panas.positive).reduce((sum, val) => sum + val, 0)
  const totalNegative = Object.values(movie.panas.negative).reduce((sum, val) => sum + val, 0)
  const panasRatio = totalPositive / (totalPositive + totalNegative)

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="relative">
        {/* Backdrop Image */}
        <div className="absolute inset-0 h-[70vh]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background z-10"></div>
          <Image
            src={movie.backdrop || "/placeholder.svg"}
            alt={movie.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Movie Details */}
        <div className="container mx-auto px-4 pt-32 pb-12 relative z-20">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie Poster */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-96 mx-auto md:mx-0 rounded-lg overflow-hidden shadow-xl">
                <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill style={{ objectFit: "cover" }} />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Button
                  onClick={handleToggleWatchlist}
                  variant="outline"
                  className={`w-full ${inWatchlist ? "bg-primary/10 border-primary text-primary" : "border-gray-700 text-gray-300"}`}
                >
                  {inWatchlist ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> In Watchlist
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" /> Add to Watchlist
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleToggleFavorite}
                  variant="outline"
                  className={`w-full ${isFavorite ? "bg-secondary/10 border-secondary text-secondary" : "border-gray-700 text-gray-300"}`}
                >
                  {isFavorite ? (
                    <>
                      <Heart className="mr-2 h-4 w-4 fill-secondary" /> Favorite
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-4 w-4" /> Add to Favorites
                    </>
                  )}
                </Button>

                <Button variant="outline" className="w-full border-gray-700 text-gray-300">
                  <Play className="mr-2 h-4 w-4" /> Watch Trailer
                </Button>
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {movie.title} <span className="text-gray-400">({movie.year})</span>
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {movie.duration}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-secondary text-secondary mr-1" />
                  {movie.rating}/10
                </div>
                <div>{movie.genres.join(", ")}</div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
                <p className="text-gray-300">{movie.overview}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2 text-primary" /> Director
                  </h3>
                  <p className="text-gray-300">{movie.director}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" /> Cast
                  </h3>
                  <p className="text-gray-300">{movie.cast.join(", ")}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-secondary" /> PANAS Analysis
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/40 border border-gray-800 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Positive Affect: {totalPositive}/50</h4>
                    <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${(totalPositive / 50) * 100}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(movie.panas.positive).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-400 capitalize">{key}</span>
                          <span className="text-white">{value}/5</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-black/40 border border-gray-800 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Negative Affect: {totalNegative}/50</h4>
                    <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
                      <div
                        className="bg-red-500 h-2.5 rounded-full"
                        style={{ width: `${(totalNegative / 50) * 100}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(movie.panas.negative).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-400 capitalize">{key}</span>
                          <span className="text-white">{value}/5</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Your Rating</h3>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="p-1"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => handleRateMovie(star)}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoveredRating || userRating || 0) ? "fill-secondary text-secondary" : "text-gray-500"
                        }`}
                      />
                    </button>
                  ))}
                  {userRating && <span className="ml-2 text-gray-300">{userRating}/5</span>}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Write a Review</h3>
                <Textarea
                  placeholder="Share your thoughts about this movie..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="bg-gray-900 border-gray-700 mb-4"
                  rows={4}
                />
                <Button
                  onClick={handleSubmitReview}
                  disabled={!reviewText.trim() || isSubmittingReview}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  {isSubmittingReview ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Similar Movies</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movie.similarMovies.map((similarMovie) => (
            <Link href={`/movie/${similarMovie.id}`} key={similarMovie.id}>
              <Card className="bg-black/40 border-gray-800 overflow-hidden movie-card">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={similarMovie.image || "/placeholder.svg"}
                    alt={similarMovie.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white truncate">{similarMovie.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-400 text-sm">{similarMovie.year}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-secondary text-secondary mr-1" />
                      <span className="text-white text-sm">{similarMovie.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

