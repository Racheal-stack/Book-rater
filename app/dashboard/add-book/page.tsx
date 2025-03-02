"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { addBook } from "@/lib/book-service"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

const genres = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Horror",
  "Biography",
  "History",
  "Self-Help",
  "Business",
  "Other",
]

export default function AddBookPage() {
  const [title, setTitle] = useState("")
  const [genre, setGenre] = useState(genres[0])
  const [rating, setRating] = useState(5)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!title.trim()) {
      setError("Book title is required")
      return
    }

    try {
      if (!user) {
        throw new Error("You must be logged in to add a book")
      }

      addBook({
        title,
        genre,
        rating,
        userId: user.id,
      })

      setSuccess(true)
      setTitle("")
      setGenre(genres[0])
      setRating(5)

      // Redirect to library after a short delay
      setTimeout(() => {
        router.push("/dashboard/library")
      }, 1500)
    } catch (err: any) {
      setError(err.message || "Failed to add book")
      console.error(err)
    }
  }

  if (isLoading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold">Add New Book</h1>

        <Card>
          <CardHeader>
            <CardTitle>Book Details</CardTitle>
            <CardDescription>Enter the details of the book you want to add to your collection</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="add-book-form" onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertDescription>Book added successfully! Redirecting to your library...</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Book Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter book title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <select
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {genres.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-10)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="rating"
                    type="range"
                    min="1"
                    max="10"
                    value={rating}
                    onChange={(e) => setRating(Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="w-8 text-center font-medium">{rating}</span>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" form="add-book-form" className="ml-auto">
              Add Book
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}

