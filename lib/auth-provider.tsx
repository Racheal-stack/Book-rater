"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  email: string
  name?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name?: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, you would validate against a backend
    setIsLoading(true)

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const user = users.find((u: any) => u.email === email)

      if (!user || user.password !== password) {
        throw new Error("Invalid credentials")
      }

      // Remove password from user object before storing in state
      const { password: _, ...userWithoutPassword } = user

      // Store user in localStorage and state
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      setUser(userWithoutPassword)

      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, name?: string) => {
    setIsLoading(true)

    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem("users") || "[]")

      // Check if user already exists
      if (users.some((u: any) => u.email === email)) {
        throw new Error("User already exists")
      }

      // Create new user
      const newUser = {
        id: crypto.randomUUID(),
        email,
        password,
        name,
      }

      // Add to users array
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      // Remove password from user object before storing in state
      const { password: _, ...userWithoutPassword } = newUser

      // Store user in localStorage and state
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      setUser(userWithoutPassword)

      return true
    } catch (error) {
      console.error("Signup failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

