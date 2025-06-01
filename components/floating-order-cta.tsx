"use client"

import { useState, useEffect } from "react"

export function FloatingOrderCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the CTA after user has scrolled down a bit
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleOrderClick = () => {
    // Track the conversion event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion_cta_click", {
        source: "floating_order_button",
        value: 399,
      })
    }

    // Redirect to order page or open modal
    window.open("https://dinezzy.com/order", "_blank")
  }

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <button
        onClick={handleOrderClick}
        className="w-full md:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl font-bold shadow-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
      >
        <span className="text-2xl">👨‍🍳</span>
        <div className="text-left">
          <div className="text-sm md:text-base font-bold">Order Chef Service</div>
          <div className="text-xs md:text-sm opacity-90">Starting ₹399 only</div>
        </div>
        <span className="text-xl">→</span>
      </button>
    </div>
  )
}
