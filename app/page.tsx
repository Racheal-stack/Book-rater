import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">BookRater</span>
          </div>
          <nav className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Track and Rate Your Reading Journey
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Keep a personal library of all your books, rate them, and discover your reading patterns.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Track Your Books</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Add books to your personal library with details like title, genre, and your rating.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Rate and Review</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Give ratings to books you've read and keep track of your favorites.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Explore Your Library</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  View all your books sorted by rating and discover patterns in your reading habits.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} BookRater. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

