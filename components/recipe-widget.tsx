"use client"

import { useState } from "react"
import { RecipeInput } from "./recipe-input"
import { RecipeResults } from "./recipe-results"
import { LoadingState } from "./loading-state"
import { ConversionCTA } from "./conversion-cta"
import { FloatingIngredientBadge } from "./floating-ingredient-badge"
import { FloatingOrderCTA } from "./floating-order-cta"

interface Recipe {
  id: string
  name: string
  nameHindi?: string
  ingredients: string[]
  instructions: string[]
  cookTime: string
  difficulty: string
  serves: number
}

interface RecipeWidgetProps {
  onBack: () => void
}

export function RecipeWidget({ onBack }: RecipeWidgetProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [lastSearch, setLastSearch] = useState<{
    ingredients: string
    mealCount: number
    allowExtraIngredients: boolean
  } | null>(null)
  const [correctedIngredients, setCorrectedIngredients] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

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

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch recipes")
      }

      if (data.success && data.recipes && data.recipes.length > 0) {
        setRecipes(data.recipes)
        setCorrectedIngredients(data.correctedIngredients || ingredients)
      } else {
        throw new Error("No recipes found for your ingredients")
      }
    } catch (err) {
      console.error("Recipe search error:", err)
      setError(err instanceof Error ? err.message : "Sorry, we couldn't find recipes right now. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTryAnother = async () => {
    if (lastSearch) {
      // Clear current recipes first to show loading state
      setRecipes([])
      await handleSearch(lastSearch.ingredients, lastSearch.mealCount, lastSearch.allowExtraIngredients)
    }
  }

  const handleClearResults = () => {
    setRecipes([])
    setLastSearch(null)
    setCorrectedIngredients("")
    setError(null)
  }

  const detectLanguage = (text: string): string => {
    // Simple language detection
    const hindiPattern = /[\u0900-\u097F]/
    const hinglishPattern = /(pyaz|ande|doodh|aloo|tamatar|mirch|namak|tel|jeera|haldi)/i

    if (hindiPattern.test(text)) return "hindi"
    if (hinglishPattern.test(text)) return "hinglish"
    return "english"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F3] to-orange-50">
      {/* Enhanced Header - Mobile Optimized */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            <div className="flex items-center space-x-3 md:space-x-4">
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-[#FF6B35] transition-colors font-medium flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
              >
                <span>←</span>
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-[#FF6B35] to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xs md:text-sm">D</span>
                </div>
                <div>
                  <h1 className="text-sm md:text-lg font-bold text-gray-900">Dinezzy</h1>
                  <p className="text-xs text-gray-500 hidden md:block">Recipe Suggestions</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <span className="text-xl md:text-3xl">🍽️</span>
              <span className="font-bold text-gray-900 text-sm md:text-lg hidden sm:block">What Can I Cook?</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4 md:py-8 pb-24">
        {!isLoading && (!recipes || recipes.length === 0) && !error && <RecipeInput onSearch={handleSearch} />}

        {isLoading && <LoadingState />}

        {error && (
          <div className="max-w-2xl mx-auto text-center py-8 md:py-16">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="text-4xl md:text-6xl mb-4">😔</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Oops! Something went wrong</h3>
              <p className="text-sm md:text-base text-gray-500 mb-6">{error}</p>
              <button
                onClick={handleClearResults}
                className="bg-gradient-to-r from-[#FF6B35] to-orange-600 text-white px-6 md:px-8 py-3 rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!isLoading && recipes && recipes.length > 0 && (
          <>
            <RecipeResults
              recipes={recipes}
              searchIngredients={lastSearch?.ingredients || ""}
              correctedIngredients={correctedIngredients}
              onTryAnother={handleTryAnother}
              onClearResults={handleClearResults}
            />
            <ConversionCTA />
          </>
        )}
      </main>

      {/* Floating Elements */}
      {lastSearch && <FloatingIngredientBadge ingredients={correctedIngredients || lastSearch.ingredients} />}
      <FloatingOrderCTA />
    </div>
  )
}
