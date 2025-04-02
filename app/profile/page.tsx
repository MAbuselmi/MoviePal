"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, Clock, Settings, LogOut } from "lucide-react"

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
    joinDate: "January 2023",
    watchlist: [
      { id: 1, title: "Inception", year: 2010, rating: 8.8, image: "/placeholder.svg?height=400&width=300" },
      {
        id: 2,
        title: "The Shawshank Redemption",
        year: 1994,
        rating: 9.3,
        image: "/placeholder.svg?height=400&width=300",
      },
      { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, image: "/placeholder.svg?height=400&width=300" },
    ],
    favorites: [
      { id: 4, title: "Pulp Fiction", year: 1994, rating: 8.9, image: "/placeholder.svg?height=400&width=300" },
      { id: 5, title: "Fight Club", year: 1999, rating: 8.8, image: "/placeholder.svg?height=400&width=300" },
    ],
    ratings: [
      {
        id: 6,
        title: "The Godfather",
        year: 1972,
        rating: 9.2,
        userRating: 5,
        image: "/placeholder.svg?height=400&width=300",
      },
      {
        id: 7,
        title: "The Matrix",
        year: 1999,
        rating: 8.7,
        userRating: 4,
        image: "/placeholder.svg?height=400&width=300",
      },
      {
        id: 8,
        title: "Goodfellas",
        year: 1990,
        rating: 8.7,
        userRating: 5,
        image: "/placeholder.svg?height=400&width=300",
      },
      {
        id: 9,
        title: "Interstellar",
        year: 2014,
        rating: 8.6,
        userRating: 4,
        image: "/placeholder.svg?height=400&width=300",
      },
    ],
  }

  const [activeTab, setActiveTab] = useState("watchlist")

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* User Profile Sidebar */}
          <div className="space-y-6">
            <Card className="bg-black/60 border-gray-800 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary">
                    <Image
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
                  <p className="text-gray-400 text-sm mb-4">{user.email}</p>
                  <p className="text-gray-500 text-xs">Member since {user.joinDate}</p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-black/40 rounded-lg p-2">
                    <p className="text-2xl font-bold text-white">{user.watchlist.length}</p>
                    <p className="text-xs text-gray-400">Watchlist</p>
                  </div>
                  <div className="bg-black/40 rounded-lg p-2">
                    <p className="text-2xl font-bold text-white">{user.favorites.length}</p>
                    <p className="text-xs text-gray-400">Favorites</p>
                  </div>
                  <div className="bg-black/40 rounded-lg p-2">
                    <p className="text-2xl font-bold text-white">{user.ratings.length}</p>
                    <p className="text-xs text-gray-400">Ratings</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Link href="/profile/settings">
                    <Button variant="outline" className="w-full border-gray-700 text-gray-300">
                      <Settings className="mr-2 h-4 w-4" /> Account Settings
                    </Button>
                  </Link>
                  <Link href="/logout">
                    <Button variant="outline" className="w-full border-gray-700 text-gray-300">
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/60 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recommendation Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Action</span>
                      <span className="text-white">65%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Drama</span>
                      <span className="text-white">80%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Sci-Fi</span>
                      <span className="text-white">45%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Comedy</span>
                      <span className="text-white">30%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Content */}
          <div>
            <Tabs defaultValue="watchlist" onValueChange={setActiveTab}>
              <TabsList className="bg-black/60 border border-gray-800">
                <TabsTrigger value="watchlist" className="data-[state=active]:bg-primary">
                  <Clock className="h-4 w-4 mr-2" /> Watchlist
                </TabsTrigger>
                <TabsTrigger value="favorites" className="data-[state=active]:bg-primary">
                  <Heart className="h-4 w-4 mr-2" /> Favorites
                </TabsTrigger>
                <TabsTrigger value="ratings" className="data-[state=active]:bg-primary">
                  <Star className="h-4 w-4 mr-2" /> Ratings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="watchlist" className="mt-6">
                {user.watchlist.length === 0 ? (
                  <div className="text-center py-12 bg-black/40 rounded-lg border border-gray-800">
                    <Clock className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Your watchlist is empty</h3>
                    <p className="text-gray-400 mb-4">
                      Add movies to your watchlist to keep track of what you want to watch
                    </p>
                    <Link href="/">
                      <Button className="bg-primary hover:bg-primary/90 text-white">Browse Movies</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {user.watchlist.map((movie) => (
                      <Card key={movie.id} className="bg-black/40 border-gray-800 overflow-hidden movie-card">
                        <Link href={`/movie/${movie.id}`}>
                          <div className="relative aspect-[2/3] overflow-hidden">
                            <Image
                              src={movie.image || "/placeholder.svg"}
                              alt={movie.title}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </Link>
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
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="favorites" className="mt-6">
                {user.favorites.length === 0 ? (
                  <div className="text-center py-12 bg-black/40 rounded-lg border border-gray-800">
                    <Heart className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No favorites yet</h3>
                    <p className="text-gray-400 mb-4">Add movies to your favorites to easily find them later</p>
                    <Link href="/">
                      <Button className="bg-primary hover:bg-primary/90 text-white">Browse Movies</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {user.favorites.map((movie) => (
                      <Card key={movie.id} className="bg-black/40 border-gray-800 overflow-hidden movie-card">
                        <Link href={`/movie/${movie.id}`}>
                          <div className="relative aspect-[2/3] overflow-hidden">
                            <Image
                              src={movie.image || "/placeholder.svg"}
                              alt={movie.title}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </Link>
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
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="ratings" className="mt-6">
                {user.ratings.length === 0 ? (
                  <div className="text-center py-12 bg-black/40 rounded-lg border border-gray-800">
                    <Star className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No ratings yet</h3>
                    <p className="text-gray-400 mb-4">Rate movies to get better recommendations</p>
                    <Link href="/rating">
                      <Button className="bg-primary hover:bg-primary/90 text-white">Rate Movies</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {user.ratings.map((movie) => (
                      <Card key={movie.id} className="bg-black/40 border-gray-800 overflow-hidden movie-card">
                        <Link href={`/movie/${movie.id}`}>
                          <div className="relative aspect-[2/3] overflow-hidden">
                            <Image
                              src={movie.image || "/placeholder.svg"}
                              alt={movie.title}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </Link>
                        <CardContent className="p-4">
                          <Link href={`/movie/${movie.id}`}>
                            <h3 className="font-semibold text-white hover:text-primary transition-colors truncate">
                              {movie.title}
                            </h3>
                          </Link>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-gray-400 text-sm">{movie.year}</span>
                            <div className="flex items-center">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= movie.userRating ? "fill-secondary text-secondary" : "text-gray-500"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}

