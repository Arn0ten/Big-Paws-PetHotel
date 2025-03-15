"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // In a real app, you would validate and create the user account here
      // For demo purposes, we'll just navigate to the pet-owner interface
      router.push("/webapp/pet-owner/dashboard")

      toast({
        title: "Registration Successful",
        description: "Your account has been created. Welcome to Pet Hotel!",
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Your Name" disabled={isLoading} />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Your Email" disabled={isLoading} />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Your Password" disabled={isLoading} />
          </div>
          {error && <p className="text-red-500 text-sm italic mb-4">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage

