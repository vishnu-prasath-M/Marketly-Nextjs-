"use client"

import { useState, TouchEvent } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  images: string[]
  title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  if (!images || images.length === 0) {
    return (
      <div className="h-96 w-full bg-secondary flex items-center justify-center rounded-t-xl">
        <p className="text-muted-foreground">No image available</p>
      </div>
    )
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return
    const diff = e.changedTouches[0].clientX - touchStartX
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handlePrev()
      } else {
        handleNext()
      }
    }
    setTouchStartX(null)
  }

  return (
    <div className="w-full">
      <div
        className="relative h-80 w-full overflow-hidden rounded-t-xl bg-slate-900/5"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[activeIndex]}
          alt={title}
          fill
          className="object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/70 text-white shadow-sm transition hover:bg-slate-900"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={handleNext}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/70 text-white shadow-sm transition hover:bg-slate-900"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 bg-slate-50 px-4 py-3">
          {images.map((img, index) => (
            <button
              key={img + index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-1.5 w-4 rounded-full bg-slate-300 transition-all",
                index === activeIndex && "w-6 bg-accent"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
