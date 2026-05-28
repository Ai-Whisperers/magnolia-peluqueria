"use client"

import { useEffect, useRef } from "react"

interface SkeletonProps {
  className?: string
  style?: React.CSSProperties
  variant?: "text" | "circular" | "rectangular"
}

export function Skeleton({ className = "", style, variant = "rectangular" }: SkeletonProps) {
  const base = "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded"
  const variantClass = variant === "circular" ? "rounded-full" : variant === "text" ? "rounded h-4" : "rounded-lg"
  return <div className={`${base} ${variantClass} ${className}`} style={style} />
}

// Service card skeleton for loading states
export function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton variant="circular" className="w-10 h-10" />
        <Skeleton className="h-5 w-32" variant="text" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" variant="text" />
        <Skeleton className="h-4 w-3/4" variant="text" />
        <Skeleton className="h-4 w-1/2" variant="text" />
      </div>
    </div>
  )
}

// Booking form skeleton
export function BookingFormSkeleton() {
  return (
    <div className="space-y-6 p-8">
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-12 w-1/3 ml-auto" />
    </div>
  )
}