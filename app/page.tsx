import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Film, Star, Heart, Clock, TrendingUp } from "lucide-react"

export default function Home() {
  // Mock data for featured and trending movies
  const featuredMovies = [
    { id: 1, title: "Inception", year: 2010, rating: 8.8, image: "/placeholder.svg?height=400&width=300" },
    {
      id: 2,
      title: "The Shawshank Redemption",
      year: 1994,
      rating: 9.3,
      image: "/placeholder.svg?height=400&width=300",
    },
    { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, image: "/placeholder.svg?height=400&width=300" },
    { id: 4, title: "Pulp Fiction", year: 1994, rating: 8.9, image: "/placeholder.svg?height=400&width=300" },
  ]

  const trendingMovies = [
    { id: 5, title: "Dune", year: 2021, rating: 8.0, image: "/placeholder.svg?height=400&width=300" },
    { id: 6, title: "No Time to Die", year: 2021, rating: 7.3, image: "/placeholder.svg?height=400&width=300" },
    { id: 7, title: "The Batman", year: 2022, rating: 7.9, image: "/placeholder.svg?height=400&width=300" },
    { id: 8, title: "Top Gun: Maverick", year: 2022, rating: 8.3, image: "/placeholder.svg?height=400&width=300" },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Featured Movie"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Find Your Perfect Movie</h1>
            <p className="text-lg text-gray-300 mb-8">
              Personalized recommendations based on your mood, preferences, and favorite stories.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/mood">
                <Button className="bg-primary hover:bg-primary/90 text-white">Mood-Based Recommendations</Button>
              </Link>
              <Link href="/story">
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                  Story-Based Recommendations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Star className="mr-2 text-secondary" /> Featured Movies
          </h2>
          <Link href="/movies">
            <Button variant="link" className="text-gray-300 hover:text-white">
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredMovies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <Card className="bg-black/40 border-gray-800 overflow-hidden movie-card">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white truncate">{movie.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-400 text-sm">{movie.year}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-secondary text-secondary mr-1" />
                      <span className="text-white text-sm">{movie.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <TrendingUp className="mr-2 text-secondary" /> Trending Now
          </h2>
          <Link href="/trending">
            <Button variant="link" className="text-gray-300 hover:text-white">
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingMovies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <Card className="bg-black/40 border-gray-800 overflow-hidden movie-card">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white truncate">{movie.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-400 text-sm">{movie.year}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-secondary text-secondary mr-1" />
                      <span className="text-white text-sm">{movie.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black/40 border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Film className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Mood-Based</h3>
            <p className="text-gray-400 mb-4">
              Get movie recommendations based on your current mood using the PANAS scale.
            </p>
            <Link href="/mood" className="mt-auto">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Try It Now
              </Button>
            </Link>
          </div>

          <div className="bg-black/40 border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Story-Based</h3>
            <p className="text-gray-400 mb-4">Discover movies that match your favorite themes, actors, or directors.</p>
            <Link href="/story" className="mt-auto">
              <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                Explore Stories
              </Button>
            </Link>
          </div>

          <div className="bg-black/40 border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Watchlist</h3>
            <p className="text-gray-400 mb-4">
              Save movies to watch later and get personalized recommendations based on your list.
            </p>
            <Link href="/profile" className="mt-auto">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                View Watchlist
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

