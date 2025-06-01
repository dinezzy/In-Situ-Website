"use client"

import { useState } from "react"

interface Recipe {
  id: string
  name: string
  nameHindi?: string
  ingredients: string[]
  instructions: string[]
  image: string
  cookTime: string
  difficulty: string
  serves: number
  mealType?: string
  description?: string
}

interface MealSet {
  mealType: string
  recipes: Recipe[]
}

export default function WhatCanICookPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [mealSets, setMealSets] = useState<MealSet[]>([])
  const [lastSearch, setLastSearch] = useState<{
    ingredients: string
    mealCount: number
    allowExtraIngredients: boolean
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  const handleSearch = async (ingredients: string, mealCount: number, allowExtraIngredients: boolean) => {
    setIsLoading(true)
    setError(null)
    setLastSearch({ ingredients, mealCount, allowExtraIngredients })

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients,
          mealCount,
          allowExtraIngredients,
          language: detectLanguage(ingredients),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch recipes")
      }

      const data = await response.json()
      setRecipes(data.recipes || [])
      setMealSets(data.mealSets || [])
    } catch (err) {
      setError("Sorry, we couldn't find recipes right now. Please try again.")
      console.error("Recipe search error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTryAnother = async () => {
    if (lastSearch) {
      await handleSearch(lastSearch.ingredients, lastSearch.mealCount, lastSearch.allowExtraIngredients)
    }
  }

  const handleClearResults = () => {
    setRecipes([])
    setMealSets([])
    setLastSearch(null)
    setError(null)
  }

  const detectLanguage = (text: string): string => {
    const hindiPattern = /[\u0900-\u097F]/
    const hinglishPattern = /(pyaz|ande|doodh|aloo|tamatar|mirch|namak|tel|jeera|haldi)/i

    if (hindiPattern.test(text)) return "hindi"
    if (hinglishPattern.test(text)) return "hinglish"
    return "english"
  }

  // Function to get food emoji
  function getFoodEmoji(recipeName: string, mealType: string): string {
    const name = recipeName.toLowerCase()
  
    // Specific dish emojis
    if (name.includes("poha")) return "🥣"
    if (name.includes("omelette") || name.includes("egg")) return "🍳"
    if (name.includes("rice")) return "🍚"
    if (name.includes("dal") || name.includes("lentil")) return "🫘"
    if (name.includes("chai") || name.includes("tea")) return "☕"
    if (name.includes("paratha") || name.includes("roti")) return "🫓"
    if (name.includes("curry") || name.includes("sabzi")) return "🍛"
    if (name.includes("paneer")) return "🧀"
    if (name.includes("aloo") || name.includes("potato")) return "🥔"
    if (name.includes("chana") || name.includes("chickpea")) return "🫛"
  
    // Meal type based emojis
    if (mealType === "Breakfast") return "🌅"
    if (mealType === "Lunch") return "🌞"
    if (mealType === "Dinner") return "🌙"
  
    return "🍽️"
  }

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">🍽️</span>
              <h1 className="text-2xl font-bold text-gray-900">What Can I Cook?</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Input Section */}
        {!isLoading && recipes.length === 0 && !error && (
          <RecipeInput onSearch={handleSearch} />
        )}

        {/* Loading State */}
        {isLoading && <LoadingState />}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-500 mb-6">{error}</p>
            <button
              onClick={handleClearResults}
              className="\
