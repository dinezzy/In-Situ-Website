"use client"

import { useState } from "react"

interface Recipe {
  id: string
  name: string
  nameHindi?: string
  ingredients: string[]
  instructions: string[]
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

interface RecipeResultsProps {
  recipes: Recipe[]
  mealSets?: MealSet[]
  searchIngredients: string
  correctedIngredients?: string
  onTryAnother: () => void
  onClearResults: () => void
  structure?: {
    mealCount: number
    recipesPerMeal: number
    totalSets: number
  }
}

// Enhanced food emoji function with better variety
function getFoodEmoji(recipeName: string, mealType: string): string {
  const name = recipeName.toLowerCase()

  // Specific dish emojis
  if (name.includes("poha")) return "🥣"
  if (name.includes("omelette") || name.includes("egg") || name.includes("scrambled")) return "🍳"
  if (name.includes("rice") || name.includes("jeera")) return "🍚"
  if (name.includes("dal") || name.includes("lentil")) return "🫘"
  if (name.includes("chai") || name.includes("tea")) return "☕"
  if (name.includes("paratha") || name.includes("roti") || name.includes("chapati")) return "🫓"
  if (name.includes("curry") || name.includes("sabzi")) return "🍛"
  if (name.includes("paneer") || name.includes("bhurji")) return "🧀"
  if (name.includes("aloo") || name.includes("potato")) return "🥔"
  if (name.includes("chana") || name.includes("chickpea")) return "🫛"
  if (name.includes("onion") || name.includes("pyaz")) return "🧅"
  if (name.includes("tomato") || name.includes("tamatar")) return "🍅"
  if (name.includes("upma")) return "🥣"
  if (name.includes("biryani") || name.includes("pulao")) return "🍛"
  if (name.includes("fry") || name.includes("crispy")) return "🔥"

  // Meal type based emojis
  if (mealType === "Breakfast") return "🌅"
  if (mealType === "Lunch") return "🌞"
  if (mealType === "Dinner") return "🌙"

  return "🍽️"
}

// Difficulty color mapping
function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-800 border-green-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "hard":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function RecipeResults({
  recipes = [],
  mealSets,
  searchIngredients = "",
  correctedIngredients = "",
  onTryAnother,
  onClearResults,
  structure,
}: RecipeResultsProps) {
  const [expandedMeals, setExpandedMeals] = useState<Record<string, boolean>>({})
  const [expandedRecipes, setExpandedRecipes] = useState<Record<string, boolean>>({})

  // Add safety check
  if (!recipes || recipes.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Recipes Found</h3>
          <p className="text-gray-500 mb-6">Please try different ingredients or enable extra ingredients</p>
          <button
            onClick={onClearResults}
            className="bg-gradient-to-r from-[#FF6B35] to-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const groupedRecipes = mealSets && mealSets.length > 0 ? mealSets : [{ mealType: "Recipes", recipes }]

  const toggleMealExpansion = (mealType: string) => {
    setExpandedMeals((prev) => ({
      ...prev,
      [mealType]: !prev[mealType],
    }))
  }

  const toggleRecipeExpansion = (recipeId: string) => {
    setExpandedRecipes((prev) => ({
      ...prev,
      [recipeId]: !prev[recipeId],
    }))
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Enhanced Results Header */}
      <div className="text-center mb-8 md:mb-12">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-4 md:p-8 mb-6">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">🎉 Perfect Recipes Found!</h2>
          <p className="text-sm md:text-lg text-gray-700 mb-2">Here are delicious Indian dishes you can make with:</p>
          <div className="bg-white rounded-full px-4 py-2 inline-block shadow-sm">
            <span className="font-bold text-[#FF6B35] text-sm md:text-base">
              {correctedIngredients || searchIngredients}
            </span>
          </div>
          {correctedIngredients && correctedIngredients !== searchIngredients && (
            <p className="text-xs md:text-sm text-gray-600 mt-2">✓ Spelling corrected and capitalized</p>
          )}
          {structure && (
            <div className="text-xs md:text-sm text-gray-600 mt-3">
              {structure.totalSets} meal set{structure.totalSets > 1 ? "s" : ""} • {recipes.length} total recipes
            </div>
          )}
        </div>
      </div>

      {/* Meal Sets */}
      {groupedRecipes.map((mealSet, setIndex) => (
        <div key={setIndex} className="mb-8 md:mb-12">
          {/* Enhanced Meal Type Header */}
          {mealSets && mealSets.length > 0 && (
            <div className="mb-6 md:mb-8">
              <button
                onClick={() => toggleMealExpansion(mealSet.mealType)}
                className="w-full bg-gradient-to-r from-[#FF6B35] to-orange-500 text-white p-4 md:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl">
                    {mealSet.mealType === "Breakfast"
                      ? "🌅"
                      : mealSet.mealType === "Lunch"
                        ? "🌞"
                        : mealSet.mealType === "Dinner"
                          ? "🌙"
                          : mealSet.mealType.includes("day")
                            ? "📅"
                            : "🍽️"}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg md:text-2xl font-bold">{mealSet.mealType}</h3>
                    <p className="text-orange-100 text-sm md:text-lg">
                      {mealSet.recipes?.length || 0} delicious options
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3">
                  {!expandedMeals[mealSet.mealType] && (
                    <div className="flex -space-x-2 md:-space-x-3">
                      {(mealSet.recipes || []).slice(0, 3).map((recipe, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-sm md:text-lg border-2 md:border-3 border-orange-300 shadow-lg"
                        >
                          {getFoodEmoji(recipe.name, recipe.mealType)}
                        </div>
                      ))}
                      {mealSet.recipes && mealSet.recipes.length > 3 && (
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-orange-200 rounded-full flex items-center justify-center text-xs md:text-sm font-bold text-orange-700 border-2 md:border-3 border-orange-300">
                          +{mealSet.recipes.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                  <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform">
                    {expandedMeals[mealSet.mealType] ? "▼" : "▶"}
                  </span>
                </div>
              </button>
            </div>
          )}

          {/* Enhanced Recipe Grid - Mobile Optimized */}
          {(expandedMeals[mealSet.mealType] || !mealSets || mealSets.length <= 1) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              {(mealSet.recipes || []).map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  {/* Recipe Header - No Image, Better Visual */}
                  <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#FF6B35] to-orange-600 rounded-2xl flex items-center justify-center text-3xl md:text-4xl shadow-lg">
                        {getFoodEmoji(recipe.name, recipe.mealType)}
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold border ${getDifficultyColor(recipe.difficulty)}`}
                      >
                        {recipe.difficulty}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{recipe.name}</h4>
                      {recipe.nameHindi && (
                        <p className="text-base md:text-lg text-[#FF6B35] font-medium">{recipe.nameHindi}</p>
                      )}
                    </div>
                  </div>

                  {/* Recipe Content */}
                  <div className="p-4 md:p-6">
                    {recipe.description && (
                      <p className="text-sm text-gray-600 mb-4 italic leading-relaxed">{recipe.description}</p>
                    )}

                    <div className="flex justify-between text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg">
                      <span className="flex items-center">
                        <span className="mr-1">⏱️</span>
                        <span className="text-xs md:text-sm">{recipe.cookTime}</span>
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">👥</span>
                        <span className="text-xs md:text-sm">{recipe.serves}</span>
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">🍽️</span>
                        <span className="text-xs md:text-sm">{recipe.mealType}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => toggleRecipeExpansion(recipe.id)}
                      className="w-full bg-gradient-to-r from-[#FF6B35] to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
                    >
                      {expandedRecipes[recipe.id] ? "Hide Details" : "View Full Recipe"}
                    </button>
                  </div>

                  {/* Expanded Recipe Details */}
                  {expandedRecipes[recipe.id] && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-100 bg-gray-50">
                      <div className="pt-4 md:pt-6 space-y-4 md:space-y-6">
                        {/* Ingredients */}
                        <div>
                          <h5 className="font-bold text-gray-900 text-base md:text-lg mb-3 flex items-center">
                            <span className="mr-2 text-xl md:text-2xl">🛒</span>
                            Ingredients (सामग्री):
                          </h5>
                          <div className="grid grid-cols-1 gap-2">
                            {recipe.ingredients.map((ingredient, i) => (
                              <div key={i} className="flex items-center bg-white p-2 md:p-3 rounded-lg shadow-sm">
                                <span className="w-2 h-2 md:w-3 md:h-3 bg-[#FF6B35] rounded-full mr-2 md:mr-3 flex-shrink-0"></span>
                                <span className="text-xs md:text-sm text-gray-700 font-medium">{ingredient}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Instructions */}
                        <div>
                          <h5 className="font-bold text-gray-900 text-base md:text-lg mb-3 flex items-center">
                            <span className="mr-2 text-xl md:text-2xl">👨‍🍳</span>
                            Cooking Instructions (विधि):
                          </h5>
                          <div className="space-y-2 md:space-y-3">
                            {recipe.instructions.map((step, i) => (
                              <div key={i} className="flex items-start bg-white p-3 md:p-4 rounded-lg shadow-sm">
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-[#FF6B35] to-orange-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold mr-3 md:mr-4 mt-0.5 flex-shrink-0">
                                  {i + 1}
                                </div>
                                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tips */}
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 md:p-4 rounded-xl border border-blue-200">
                          <h6 className="font-bold text-blue-900 mb-2 flex items-center text-sm md:text-base">
                            <span className="mr-2">💡</span>
                            Chef's Tips:
                          </h6>
                          <ul className="text-xs md:text-sm text-blue-800 space-y-1">
                            <li>• Taste and adjust seasoning as needed</li>
                            <li>• Cooking times may vary based on your stove and cookware</li>
                            <li>• Serve immediately for best taste and texture</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Enhanced Action Buttons - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mt-12 md:mt-16 px-4">
        <button
          onClick={onTryAnother}
          className="bg-gradient-to-r from-white to-gray-50 text-[#FF6B35] px-6 md:px-10 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-lg border-2 border-[#FF6B35] hover:bg-gradient-to-r hover:from-[#FF6B35] hover:to-orange-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🔄 Try Another Set (दूसरी कोशिश)
        </button>
        <button
          onClick={onClearResults}
          className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 md:px-10 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-lg hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🆕 Clear & Start Over (फिर से शुरू)
        </button>
      </div>
    </div>
  )
}
