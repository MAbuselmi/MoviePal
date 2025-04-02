"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2, Search } from "lucide-react"

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMovie, setSelectedMovie] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock movie data
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      year: 2010,
      director: "Christopher Nolan",
      genre: "Sci-Fi",
      image: "/placeholder.svg?height=100&width=70",
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      year: 1994,
      director: "Frank Darabont",
      genre: "Drama",
      image: "/placeholder.svg?height=100&width=70",
    },
    {
      id: 3,
      title: "The Dark Knight",
      year: 2008,
      director: "Christopher Nolan",
      genre: "Action",
      image: "/placeholder.svg?height=100&width=70",
    },
    {
      id: 4,
      title: "Pulp Fiction",
      year: 1994,
      director: "Quentin Tarantino",
      genre: "Crime",
      image: "/placeholder.svg?height=100&width=70",
    },
    {
      id: 5,
      title: "Fight Club",
      year: 1999,
      director: "David Fincher",
      genre: "Drama",
      image: "/placeholder.svg?height=100&width=70",
    },
  ])

  const [newMovie, setNewMovie] = useState({
    title: "",
    year: "",
    director: "",
    genre: "",
    overview: "",
    image: "/placeholder.svg?height=300&width=200",
  })

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newId = Math.max(...movies.map((m) => m.id)) + 1
      const movieToAdd = {
        ...newMovie,
        id: newId,
        year: Number.parseInt(newMovie.year),
      }

      setMovies([...movies, movieToAdd])
      setNewMovie({
        title: "",
        year: "",
        director: "",
        genre: "",
        overview: "",
        image: "/placeholder.svg?height=300&width=200",
      })

      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Error adding movie:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditMovie = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedMovies = movies.map((movie) => (movie.id === selectedMovie.id ? selectedMovie : movie))

      setMovies(updatedMovies)
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error("Error updating movie:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteMovie = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedMovies = movies.filter((movie) => movie.id !== selectedMovie.id)
      setMovies(updatedMovies)
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error("Error deleting movie:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewMovie({
      ...newMovie,
      [name]: value,
    })
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSelectedMovie({
      ...selectedMovie,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewMovie({
      ...newMovie,
      [name]: value,
    })
  }

  const handleEditSelectChange = (name: string, value: string) => {
    setSelectedMovie({
      ...selectedMovie,
      [name]: value,
    })
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage movies in the MoviePal database</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 w-full sm:w-64"
              />
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Plus className="h-4 w-4 mr-2" /> Add Movie
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 border-gray-800 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Add New Movie</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Fill in the details to add a new movie to the database
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleAddMovie} className="space-y-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-white">
                        Movie Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={newMovie.title}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-white">
                        Release Year
                      </Label>
                      <Input
                        id="year"
                        name="year"
                        type="number"
                        min="1900"
                        max="2099"
                        value={newMovie.year}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="director" className="text-white">
                        Director
                      </Label>
                      <Input
                        id="director"
                        name="director"
                        value={newMovie.director}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="genre" className="text-white">
                        Primary Genre
                      </Label>
                      <Select name="genre" onValueChange={(value) => handleSelectChange("genre", value)}>
                        <SelectTrigger className="bg-gray-900 border-gray-700">
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          <SelectItem value="Action">Action</SelectItem>
                          <SelectItem value="Comedy">Comedy</SelectItem>
                          <SelectItem value="Drama">Drama</SelectItem>
                          <SelectItem value="Horror">Horror</SelectItem>
                          <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
                          <SelectItem value="Thriller">Thriller</SelectItem>
                          <SelectItem value="Romance">Romance</SelectItem>
                          <SelectItem value="Documentary">Documentary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="overview" className="text-white">
                        Overview
                      </Label>
                      <Textarea
                        id="overview"
                        name="overview"
                        value={newMovie.overview}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-900 border-gray-700 min-h-[100px]"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                      className="border-gray-700 text-gray-300"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white" disabled={isSubmitting}>
                      {isSubmitting ? "Adding..." : "Add Movie"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="bg-black/60 border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-white">Movie Database</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-400">Poster</TableHead>
                    <TableHead className="text-gray-400">Title</TableHead>
                    <TableHead className="text-gray-400">Year</TableHead>
                    <TableHead className="text-gray-400">Director</TableHead>
                    <TableHead className="text-gray-400">Genre</TableHead>
                    <TableHead className="text-gray-400 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMovies.length === 0 ? (
                    <TableRow className="border-gray-800">
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No movies found matching your search
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMovies.map((movie) => (
                      <TableRow key={movie.id} className="border-gray-800">
                        <TableCell>
                          <div className="relative w-12 h-16 overflow-hidden rounded">
                            <Image
                              src={movie.image || "/placeholder.svg"}
                              alt={movie.title}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-white">{movie.title}</TableCell>
                        <TableCell>{movie.year}</TableCell>
                        <TableCell>{movie.director}</TableCell>
                        <TableCell>{movie.genre}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog
                              open={isEditDialogOpen && selectedMovie?.id === movie.id}
                              onOpenChange={(open) => {
                                setIsEditDialogOpen(open)
                                if (!open) setSelectedMovie(null)
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 border-gray-700 text-gray-300"
                                  onClick={() => setSelectedMovie(movie)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-black/90 border-gray-800 text-white max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-bold">Edit Movie</DialogTitle>
                                  <DialogDescription className="text-gray-400">
                                    Update the details of {selectedMovie?.title}
                                  </DialogDescription>
                                </DialogHeader>

                                {selectedMovie && (
                                  <form onSubmit={handleEditMovie} className="space-y-6 py-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-title" className="text-white">
                                          Movie Title
                                        </Label>
                                        <Input
                                          id="edit-title"
                                          name="title"
                                          value={selectedMovie.title}
                                          onChange={handleEditInputChange}
                                          required
                                          className="bg-gray-900 border-gray-700"
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="edit-year" className="text-white">
                                          Release Year
                                        </Label>
                                        <Input
                                          id="edit-year"
                                          name="year"
                                          type="number"
                                          min="1900"
                                          max="2099"
                                          value={selectedMovie.year}
                                          onChange={handleEditInputChange}
                                          required
                                          className="bg-gray-900 border-gray-700"
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="edit-director" className="text-white">
                                          Director
                                        </Label>
                                        <Input
                                          id="edit-director"
                                          name="director"
                                          value={selectedMovie.director}
                                          onChange={handleEditInputChange}
                                          required
                                          className="bg-gray-900 border-gray-700"
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="edit-genre" className="text-white">
                                          Primary Genre
                                        </Label>
                                        <Select
                                          name="genre"
                                          defaultValue={selectedMovie.genre}
                                          onValueChange={(value) => handleEditSelectChange("genre", value)}
                                        >
                                          <SelectTrigger className="bg-gray-900 border-gray-700">
                                            <SelectValue placeholder="Select genre" />
                                          </SelectTrigger>
                                          <SelectContent className="bg-gray-900 border-gray-700">
                                            <SelectItem value="Action">Action</SelectItem>
                                            <SelectItem value="Comedy">Comedy</SelectItem>
                                            <SelectItem value="Drama">Drama</SelectItem>
                                            <SelectItem value="Horror">Horror</SelectItem>
                                            <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
                                            <SelectItem value="Thriller">Thriller</SelectItem>
                                            <SelectItem value="Romance">Romance</SelectItem>
                                            <SelectItem value="Documentary">Documentary</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>

                                    <DialogFooter>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsEditDialogOpen(false)}
                                        className="border-gray-700 text-gray-300"
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        type="submit"
                                        className="bg-primary hover:bg-primary/90 text-white"
                                        disabled={isSubmitting}
                                      >
                                        {isSubmitting ? "Updating..." : "Update Movie"}
                                      </Button>
                                    </DialogFooter>
                                  </form>
                                )}
                              </DialogContent>
                            </Dialog>

                            <Dialog
                              open={isDeleteDialogOpen && selectedMovie?.id === movie.id}
                              onOpenChange={(open) => {
                                setIsDeleteDialogOpen(open)
                                if (!open) setSelectedMovie(null)
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 border-red-900 text-red-500 hover:bg-red-900/10"
                                  onClick={() => setSelectedMovie(movie)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-black/90 border-gray-800 text-white">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-bold">Delete Movie</DialogTitle>
                                  <DialogDescription className="text-gray-400">
                                    Are you sure you want to delete {selectedMovie?.title}? This action cannot be
                                    undone.
                                  </DialogDescription>
                                </DialogHeader>

                                <DialogFooter className="mt-6">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsDeleteDialogOpen(false)}
                                    className="border-gray-700 text-gray-300"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={handleDeleteMovie}
                                    disabled={isSubmitting}
                                  >
                                    {isSubmitting ? "Deleting..." : "Delete Movie"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

