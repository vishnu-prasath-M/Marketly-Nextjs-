"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"

export function BecomeSellerButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleBecomeSeller = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/user/become-seller", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to update role")
      }

      toast({
        title: "Success",
        description: "You are now a seller!",
      })

      router.push("/seller/dashboard")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update role. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleBecomeSeller}
      className="w-full"
      disabled={isLoading}
    >
      <ShoppingBag className="mr-2 h-4 w-4" />
      {isLoading ? "Updating..." : "Become a Seller"}
    </Button>
  )
}


