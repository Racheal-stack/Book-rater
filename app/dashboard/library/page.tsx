"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { getBooks, deleteBook, type Book } from "@/lib/book-service"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Star } from "lucide-react"

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
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
    }
  }, [user])

  const handleDeleteBook = (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      deleteBook(id)
      setBooks(books.filter((book) => book.id !== id))
    }
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const sortedBooks = [...books].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.rating - b.rating
    } else {
      return b.rating - a.rating
    }
  })

  if (isLoading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Library</h1>
            <p className="text-muted-foreground">
              {books.length} {books.length === 1 ? "book" : "books"} in your collection
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={toggleSortOrder} variant="outline">
              Sort by Rating: {sortOrder === "desc" ? "Highest First" : "Lowest First"}
            </Button>
            <Button onClick={() => router.push("/dashboard/add-book")}>Add Book</Button>
          </div>
        </div>

        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <h2 className="text-xl font-semibold">Your library is empty</h2>
            <p className="mt-2 text-muted-foreground">Add your first book to start building your collection</p>
            <Button className="mt-4" onClick={() => router.push("/dashboard/add-book")}>
              Add Your First Book
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedBooks.map((book) => (
              <Card key={book.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                  <CardDescription>{book.author}</CardDescription>
                  <CardDescription>{book.genre}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Star className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-medium">{book.rating}/10</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Added on {new Date(book.createdAt).toLocaleDateString()}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteBook(book.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

