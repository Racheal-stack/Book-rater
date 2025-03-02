"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, PlusCircle, Library } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.name || "Reader"}!</h1>
          <p className="text-muted-foreground">Manage your personal book collection</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Add New Book</CardTitle>
              <CardDescription>Add a new book to your collection</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/add-book">
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Book
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>My Library</CardTitle>
              <CardDescription>View all your books sorted by rating</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/library">
                <Button className="w-full" variant="outline">
                  <Library className="mr-2 h-4 w-4" />
                  View Library
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Reading Stats</CardTitle>
              <CardDescription>View your reading statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/stats">
                <Button className="w-full" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Stats
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

