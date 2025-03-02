"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { getBooks, type Book } from "@/lib/book-service"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Star, BarChart3, BookText } from "lucide-react"

type GenreCount = {
  genre: string
  count: number
}

export default function StatsPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [topGenres, setTopGenres] = useState<GenreCount[]>([])
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      const userBooks = getBooks(user.id)
      setBooks(userBooks)

      // Calculate top genres
      const genreCounts: Record<string, number> = {}
      userBooks.forEach((book) => {
        genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1
      })

      const sortedGenres = Object.entries(genreCounts)
        .map(([genre, count]) => ({ genre, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)

      setTopGenres(sortedGenres)
    }
  }, [user])

  const averageRating =
    books.length > 0 ? (books.reduce((sum, book) => sum + book.rating, 0) / books.length).toFixed(1) : "N/A"

  const highestRatedBook =
    books.length > 0 ? books.reduce((highest, book) => (book.rating > highest.rating ? book : highest), books[0]) : null

  if (isLoading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reading Statistics</h1>
          <p className="text-muted-foreground">Insights about your reading habits</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{books.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{averageRating}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Top Genre</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookText className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{topGenres.length > 0 ? topGenres[0].genre : "N/A"}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Highest Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">
                  {books.length > 0 ? Math.max(...books.map((b) => b.rating)) : "N/A"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Top Genres</CardTitle>
              <CardDescription>Your most read book genres</CardDescription>
            </CardHeader>
            <CardContent>
              {topGenres.length > 0 ? (
                <div className="space-y-4">
                  {topGenres.map((genre) => (
                    <div key={genre.genre} className="flex items-center justify-between">
                      <span>{genre.genre}</span>
                      <div className="flex items-center">
                        <span className="font-medium">{genre.count}</span>
                        <span className="ml-1 text-muted-foreground">books</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">No books in your library yet</div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Highest Rated Book</CardTitle>
              <CardDescription>Your favorite book based on rating</CardDescription>
            </CardHeader>
            <CardContent>
              {highestRatedBook ? (
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">{highestRatedBook.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{highestRatedBook.genre}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{highestRatedBook.rating}/10</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">No books in your library yet</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

