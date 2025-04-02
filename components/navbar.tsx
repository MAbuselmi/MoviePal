"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log("Searching for:", searchQuery)
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="MoviePal Logo" width={40} height={40} />
              <span className="text-xl font-bold text-white">MoviePal</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                isActive("/") ? "text-secondary" : "text-gray-300"
              }`}
            >
              Home
            </Link>
            <Link
              href="/mood"
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                isActive("/mood") ? "text-secondary" : "text-gray-300"
              }`}
            >
              Mood
            </Link>
            <Link
              href="/story"
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                isActive("/story") ? "text-secondary" : "text-gray-300"
              }`}
            >
              Story
            </Link>
            <Link
              href="/rating"
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                isActive("/rating") ? "text-secondary" : "text-gray-300"
              }`}
            >
              Rate Movies
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search movies..."
                className="w-64 bg-gray-900 border-gray-700 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-gray-300">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="search"
                placeholder="Search movies..."
                className="w-full bg-gray-900 border-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  isActive("/") ? "text-secondary" : "text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/mood"
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  isActive("/mood") ? "text-secondary" : "text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Mood
              </Link>
              <Link
                href="/story"
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  isActive("/story") ? "text-secondary" : "text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Story
              </Link>
              <Link
                href="/rating"
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  isActive("/rating") ? "text-secondary" : "text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Rate Movies
              </Link>
              <Link
                href="/profile"
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  isActive("/profile") ? "text-secondary" : "text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

