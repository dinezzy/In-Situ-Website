"use client"

import { useState, useEffect } from "react"

interface FloatingIngredientBadgeProps {
  ingredients: string
}

export function FloatingIngredientBadge({ ingredients }: FloatingIngredientBadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // For mobile, always keep visible and don't hide on scroll
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      setIsVisible(true)
      return
    }

    // Only implement scroll hiding for desktop
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide when scrolling down, show when scrolling up (desktop only)
      if (currentScrollY > lastScrollY + 10) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY - 10) {
        setIsVisible(true)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Format ingredients for display
  const formatIngredients = () => {
    const items = ingredients.split(",").map((item) => item.trim())

    if (items.length <= 2 || isExpanded) {
      return items.join(", ")
    }

    return `${items.slice(0, 2).join(", ")} +${items.length - 2} more`
  }

  return (
    <div
      className={`fixed bottom-20 md:bottom-4 right-4 z-40 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <div
        className="bg-white rounded-2xl shadow-xl border-2 border-orange-200 p-3 md:p-4 flex items-center space-x-3 cursor-pointer max-w-xs md:max-w-sm"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-[#FF6B35] to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
          🧪
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-700 text-xs md:text-sm">Your ingredients:</div>
          <div className="text-[#FF6B35] font-medium text-xs md:text-sm truncate">{formatIngredients()}</div>
        </div>
        <div className="text-gray-400 text-sm md:text-base">{isExpanded ? "−" : "+"}</div>
      </div>
    </div>
  )
}
