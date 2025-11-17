"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { toast } from "@/hooks/use-toast"
import { slugify } from "@/lib/utils"

const listingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  type: z.enum(["WEBSITE", "APP", "SAAS", "ECOMMERCE"]),
  askingPrice: z.number().min(1, "Asking price must be greater than 0"),
  monthlyRevenue: z.number().min(0),
  profitMargin: z.number().min(0).max(100),
  domainAge: z.number().min(0),
  monthlyTraffic: z.number().min(0).optional(),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
  fullDescription: z.string().min(50, "Full description must be at least 50 characters"),
  categoryId: z.string().min(1, "Please select a category"),
})

type ListingFormData = z.infer<typeof listingSchema>

export default function CreateListingPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
  })

  const onSubmit = async (data: ListingFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          slug: slugify(data.title),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create listing")
      }

      toast({
        title: "Success",
        description: "Listing created successfully!",
      })

      router.push("/seller/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create listing. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container className="py-8">
      <PageHeader title="Create New Listing" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    {...register("title")}
                    placeholder="e.g., Profitable SaaS Business"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                      onValueChange={(value) => setValue("type", value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAAS">SaaS</SelectItem>
                        <SelectItem value="ECOMMERCE">Ecommerce</SelectItem>
                        <SelectItem value="APP">App</SelectItem>
                        <SelectItem value="WEBSITE">Website</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="text-sm text-red-500">{errors.type.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoryId">Category</Label>
                    <Input
                      id="categoryId"
                      {...register("categoryId")}
                      placeholder="Category ID"
                    />
                    {errors.categoryId && (
                      <p className="text-sm text-red-500">
                        {errors.categoryId.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    {...register("shortDescription")}
                    placeholder="Brief description (shown in listings)"
                    rows={3}
                  />
                  {errors.shortDescription && (
                    <p className="text-sm text-red-500">
                      {errors.shortDescription.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullDescription">Full Description</Label>
                  <Textarea
                    id="fullDescription"
                    {...register("fullDescription")}
                    placeholder="Detailed description of your business"
                    rows={8}
                  />
                  {errors.fullDescription && (
                    <p className="text-sm text-red-500">
                      {errors.fullDescription.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="askingPrice">Asking Price ($)</Label>
                    <Input
                      id="askingPrice"
                      type="number"
                      step="0.01"
                      {...register("askingPrice", { valueAsNumber: true })}
                    />
                    {errors.askingPrice && (
                      <p className="text-sm text-red-500">
                        {errors.askingPrice.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyRevenue">Monthly Revenue ($)</Label>
                    <Input
                      id="monthlyRevenue"
                      type="number"
                      step="0.01"
                      {...register("monthlyRevenue", { valueAsNumber: true })}
                    />
                    {errors.monthlyRevenue && (
                      <p className="text-sm text-red-500">
                        {errors.monthlyRevenue.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profitMargin">Profit Margin (%)</Label>
                    <Input
                      id="profitMargin"
                      type="number"
                      step="0.1"
                      {...register("profitMargin", { valueAsNumber: true })}
                    />
                    {errors.profitMargin && (
                      <p className="text-sm text-red-500">
                        {errors.profitMargin.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domainAge">Domain Age (months)</Label>
                    <Input
                      id="domainAge"
                      type="number"
                      {...register("domainAge", { valueAsNumber: true })}
                    />
                    {errors.domainAge && (
                      <p className="text-sm text-red-500">
                        {errors.domainAge.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyTraffic">Monthly Traffic (optional)</Label>
                  <Input
                    id="monthlyTraffic"
                    type="number"
                    {...register("monthlyTraffic", { valueAsNumber: true })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Listing"}
          </Button>
        </div>
      </form>
    </Container>
  )
}


