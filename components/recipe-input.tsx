"use client"

import type React from "react"

import { useState } from "react"

interface RecipeInputProps {
  onSearch: (ingredients: string, mealCount: number, allowExtraIngredients: boolean) => void
}

export function RecipeInput({ onSearch }: RecipeInputProps) {
  const [ingredients, setIngredients] = useState("")
  const [mealCount, setMealCount] = useState(1)
  const [allowExtraIngredients, setAllowExtraIngredients] = useState(false) // Changed to false by default

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ingredients.trim()) {
      onSearch(ingredients, mealCount, allowExtraIngredients)
    }
  }

  const quickSuggestions = [
    { text: "pyaz, ande, doodh", lang: "Hinglish" },
    { text: "onion, eggs, milk", lang: "English" },
    { text: "आलू, टमाटर, चावल", lang: "Hindi" },
    { text: "aloo, tamatar, chawal", lang: "Hinglish" },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero Section - Mobile Optimized */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          🍽️ What Can I <span className="text-[#FF6B35]">Cook?</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-4">
          Discover delicious Indian recipes in Hindi, English, or Hinglish
        </p>
        <div className="flex justify-center space-x-2 md:space-x-4 text-xs md:text-sm text-gray-500">
          <span className="bg-white px-2 md:px-3 py-1 rounded-full border">🇮🇳 Hindi</span>
          <span className="bg-white px-2 md:px-3 py-1 rounded-full border">🌍 English</span>
          <span className="bg-white px-2 md:px-3 py-1 rounded-full border">🔄 Hinglish</span>
        </div>
      </div>

      {/* Input Form - Mobile Optimized */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-6 md:mb-8">
        <div className="space-y-4 md:space-y-6">
          {/* Ingredients Input */}
          <div>
            <label htmlFor="ingredients" className="block text-sm font-semibold text-gray-900 mb-2">
              Available Ingredients (उपलब्ध सामग्री)
            </label>
            <input
              type="text"
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Enter: pyaz, ande, doodh OR onion, eggs, milk"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B35] focus:outline-none transition-colors text-base md:text-lg"
              required
            />
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Type in Hindi (हिंदी), English, or Hinglish • Separate with commas
            </p>
          </div>

          {/* Extra Ingredients Option - Mobile Optimized */}
          <div className="bg-orange-50 p-3 md:p-4 rounded-xl border border-orange-200">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="allowExtra"
                checked={allowExtraIngredients}
                onChange={(e) => setAllowExtraIngredients(e.target.checked)}
                className="w-4 h-4 md:w-5 md:h-5 text-[#FF6B35] rounded border-gray-300 focus:ring-[#FF6B35] mt-0.5"
              />
              <div className="ml-3">
                <label htmlFor="allowExtra" className="block text-sm font-medium text-gray-900">
                  Include recipes with additional major ingredients
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Check this to see recipes that may require eggs, paneer, meat, or other ingredients you don't have
                </p>
              </div>
            </div>
          </div>

          {/* Meal Count Selector - Mobile Optimized */}
          <div>
            <label htmlFor="mealCount" className="block text-sm font-semibold text-gray-900 mb-2">
              How many recipes? (कितनी रेसिपी चाहिए?)
            </label>
            <select
              id="mealCount"
              value={mealCount}
              onChange={(e) => setMealCount(Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B35] focus:outline-none transition-colors text-base md:text-lg"
            >
              <option value={1}>1 recipe (1 रेसिपी)</option>
              <option value={3}>3 recipes - full day (3 रेसिपी - पूरा दिन)</option>
              <option value={7}>7 recipes - weekly variety (7 रेसिपी - साप्ताहिक)</option>
            </select>
          </div>

          {/* Submit Button - Mobile Optimized */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF6B35] to-orange-600 text-white py-4 rounded-xl font-semibold text-base md:text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Find Perfect Recipes 🔍 (रेसिपी खोजें)
          </button>
        </div>
      </form>

      {/* Quick Suggestions - Mobile Optimized */}
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-900 mb-3">Quick suggestions (त्वरित सुझाव):</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {quickSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setIngredients(suggestion.text)}
              className="bg-orange-50 text-[#FF6B35] px-3 md:px-4 py-3 rounded-xl text-sm hover:bg-[#FF6B35] hover:text-white transition-colors border border-orange-200 text-left"
            >
              <div className="font-medium">{suggestion.text}</div>
              <div className="text-xs opacity-75">{suggestion.lang}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
