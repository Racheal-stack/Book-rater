export type Book = {
  id: string
  title: string
  author: string
  genre: string
  rating: number
  userId: string
  createdAt: string
}

export function getBooks(userId: string): Book[] {
  if (typeof window === "undefined") return []

  try {
    const books = JSON.parse(localStorage.getItem("books") || "[]")
    return books.filter((book: Book) => book.userId === userId)
  } catch (error) {
    console.error("Error getting books:", error)
    return []
  }
}

export function addBook(book: Omit<Book, "id" | "createdAt">): Book {
  if (typeof window === "undefined") throw new Error("Cannot add book on server")

  try {
    const books = JSON.parse(localStorage.getItem("books") || "[]")

    const newBook: Book = {
      ...book,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    books.push(newBook)
    localStorage.setItem("books", JSON.stringify(books))

    return newBook
  } catch (error) {
    console.error("Error adding book:", error)
    throw error
  }
}

export function deleteBook(id: string): void {
  if (typeof window === "undefined") return

  try {
    const books = JSON.parse(localStorage.getItem("books") || "[]")
    const updatedBooks = books.filter((book: Book) => book.id !== id)
    localStorage.setItem("books", JSON.stringify(updatedBooks))
  } catch (error) {
    console.error("Error deleting book:", error)
  }
}

export function updateBook(id: string, updates: Partial<Omit<Book, "id" | "userId" | "createdAt">>): Book {
  if (typeof window === "undefined") throw new Error("Cannot update book on server")

  try {
    const books = JSON.parse(localStorage.getItem("books") || "[]")
    const bookIndex = books.findIndex((book: Book) => book.id === id)

    if (bookIndex === -1) {
      throw new Error("Book not found")
    }

    const updatedBook = {
      ...books[bookIndex],
      ...updates,
    }

    books[bookIndex] = updatedBook
    localStorage.setItem("books", JSON.stringify(books))

    return updatedBook
  } catch (error) {
    console.error("Error updating book:", error)
    throw error
  }
}

