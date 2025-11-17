"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { OfferModal } from "@/components/offers/offer-modal"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

interface OfferButtonProps {
  listingId: string
  askingPrice: number
  sellerId: string
}

export function OfferButton({ listingId, askingPrice, sellerId }: OfferButtonProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="space-y-2">
      <OfferModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        listingId={listingId}
        askingPrice={askingPrice}
      />
      <Button
        className="w-full"
        onClick={() => setModalOpen(true)}
      >
        Make an Offer
      </Button>
      <Button asChild className="w-full" variant="outline">
        <Link href={`/chat?listingId=${listingId}&sellerId=${sellerId}`}>
          <MessageCircle className="mr-2 h-4 w-4" />
          Chat with Seller
        </Link>
      </Button>
    </div>
  )
}


