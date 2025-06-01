"use client"

import { useState } from "react"
import { RecipeWidget } from "@/components/recipe-widget"
import { DinezzyHeader } from "@/components/dinezzy-header"

export default function HomePage() {
  const [showWidget, setShowWidget] = useState(false)

  if (showWidget) {
    return <RecipeWidget onBack={() => setShowWidget(false)} />
  }

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      <DinezzyHeader onShowWidget={() => setShowWidget(true)} />

      {/* Main Content - Dinezzy Homepage */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Professional <span className="text-[#FF6B35]">Home Chef Service</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Experience restaurant-quality meals prepared fresh in your kitchen by{" "}
              <span className="text-[#FF6B35] font-semibold">certified professional chefs</span>. Veg, Non-Veg, Jain,
              and Keto options available.
            </p>

            <div className="space-y-6">
              {/* Pricing Card */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                <div className="text-center">
                  <div className="text-sm font-semibold text-green-700 mb-2">₹ UNBEATABLE VALUE ₹</div>
                  <div className="text-2xl font-bold text-green-800 mb-2">
                    Complete meal for 4 people: Only ₹600-700
                  </div>
                  <div className="text-green-700 font-semibold mb-1">That's just ₹150-175 per person!</div>
                  <div className="text-sm text-green-600">
                    Less than a restaurant meal, but cooked fresh in your kitchen!
                  </div>
                </div>
              </div>

              {/* Recipe Widget CTA */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100">
                <div className="text-center">
                  <div className="text-2xl mb-3">🍽️</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Want to Cook Yourself?</h3>
                  <p className="text-gray-600 mb-4">Discover amazing Indian recipes in Hindi, English, or Hinglish</p>
                  <button
                    onClick={() => setShowWidget(true)}
                    className="bg-[#FF6B35] text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    🍽️ What Can I Cook?
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Crown Jewel Card */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
              <div className="text-center">
                <div className="text-sm font-semibold text-[#FF6B35] mb-2">👑 DINEZZY'S MAY CROWN JEWEL 👑</div>
                <div className="text-lg text-gray-800">
                  This month's most <span className="text-[#FF6B35] font-semibold">Dine-licious</span> creation was
                </div>
                <div className="text-xl font-bold text-[#FF6B35] mt-1">Paneer Do Pyaza</div>
              </div>
            </div>

            {/* Customer Stats */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-4xl font-bold text-[#FF6B35] mb-2">👥 005+⭐</div>
              <div className="text-xl font-bold text-[#FF6B35] mb-2">Happy customers served!!</div>
              <div className="text-gray-600">Why choose expensive restaurants or unhealthy takeout?</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
