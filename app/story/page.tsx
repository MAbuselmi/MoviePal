"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Film, User, Tag } from "lucide-react"

export default function StoryPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    storyDescription: "",
    keywords: "",
    actors: "",
    directors: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate at least one field is filled
    if (!formData.storyDescription && !formData.keywords && !formData.actors && !formData.directors) {
      setError("Please fill at least one field to get recommendations")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Encode form data for URL
      const params = new URLSearchParams()
      if (formData.storyDescription) params.append("story", formData.storyDescription)
      if (formData.keywords) params.append("keywords", formData.keywords)
      if (formData.actors) params.append("actors", formData.actors)
      if (formData.directors) params.append("directors", formData.directors)
      params.append("type", "story")

      // Redirect to recommendations page
      router.push(`/recommendations?${params.toString()}`)
    } catch (error) {
      console.error("Error submitting story data:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Find Movies by Story Elements</h1>
            <p className="text-gray-400">
              Describe the type of story, themes, actors, or directors you're interested in to get personalized
              recommendations.
            </p>
          </div>

          <Card className="bg-black/60 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Story-Based Recommendations</CardTitle>
              <CardDescription className="text-gray-400">
                Fill in any of the fields below to help us find the perfect movies for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="storyDescription" className="text-white flex items-center">
                    <Film className="mr-2 h-4 w-4 text-primary" />
                    Story Description
                  </Label>
                  <Textarea
                    id="storyDescription"
                    name="storyDescription"
                    placeholder="Describe the type of story or theme you're looking for (e.g., 'A redemption story with unexpected twists')"
                    value={formData.storyDescription}
                    onChange={handleChange}
                    className="bg-gray-900 border-gray-700 min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords" className="text-white flex items-center">
                    <Tag className="mr-2 h-4 w-4 text-secondary" />
                    Keywords or Genres
                  </Label>
                  <Input
                    id="keywords"
                    name="keywords"
                    placeholder="Enter keywords or genres (e.g., 'time travel, dystopian, thriller')"
                    value={formData.keywords}
                    onChange={handleChange}
                    className="bg-gray-900 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="actors" className="text-white flex items-center">
                    <User className="mr-2 h-4 w-4 text-primary" />
                    Actors
                  </Label>
                  <Input
                    id="actors"
                    name="actors"
                    placeholder="Enter actors you like (e.g., 'Tom Hanks, Meryl Streep')"
                    value={formData.actors}
                    onChange={handleChange}
                    className="bg-gray-900 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="directors" className="text-white flex items-center">
                    <User className="mr-2 h-4 w-4 text-secondary" />
                    Directors
                  </Label>
                  <Input
                    id="directors"
                    name="directors"
                    placeholder="Enter directors you like (e.g., 'Christopher Nolan, Greta Gerwig')"
                    value={formData.directors}
                    onChange={handleChange}
                    className="bg-gray-900 border-gray-700"
                  />
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={isLoading}>
                  {isLoading ? "Finding Movies..." : "Get Recommendations"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-sm text-gray-400 text-center">
              The more information you provide, the better our recommendations will be!
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}

