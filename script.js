// Indian Recipe Finder - Main JavaScript File

// Recipe Database
const recipes = [
  {
    id: 1,
    name: "Masala Scrambled Eggs",
    emoji: "🍳",
    ingredients: ["egg", "onion", "tomato", "green chili", "turmeric", "cumin", "coriander", "oil", "salt"],
    description: "Spicy Indian-style scrambled eggs with aromatic spices and fresh vegetables",
    steps: [
      "Heat 2 tablespoons oil in a non-stick pan over medium heat",
      "Add 1 teaspoon cumin seeds and let them splutter",
      "Add chopped onions and green chilies, sauté until golden brown",
      "Add chopped tomatoes and cook until they become soft and mushy",
      "Add turmeric powder, salt, and mix well",
      "Beat the eggs and pour into the pan",
      "Scramble gently with a spatula until eggs are cooked",
      "Garnish with fresh coriander leaves and serve hot",
    ],
    cookTime: "10 mins",
    difficulty: "Easy",
    servings: "2-3",
  },
  {
    id: 2,
    name: "Jeera Rice",
    emoji: "🍚",
    ingredients: ["rice", "cumin", "bay leaf", "onion", "ghee", "salt", "water"],
    description: "Fragrant cumin-flavored basmati rice, perfect as a side dish",
    steps: [
      "Wash and soak basmati rice for 30 minutes, then drain",
      "Heat ghee in a heavy-bottomed pot over medium heat",
      "Add cumin seeds and bay leaves, let them splutter",
      "Add thinly sliced onions and sauté until light golden",
      "Add the soaked rice and gently mix for 2 minutes",
      "Add water (1:2 ratio with rice) and salt to taste",
      "Bring to a boil, then reduce heat to low and cover",
      "Cook for 15 minutes, then let it rest for 5 minutes before serving",
    ],
    cookTime: "25 mins",
    difficulty: "Easy",
    servings: "4",
  },
  {
    id: 3,
    name: "Aloo Sabzi",
    emoji: "🥔",
    ingredients: ["potato", "turmeric", "cumin", "coriander", "onion", "tomato", "ginger", "garlic", "oil"],
    description: "Simple and delicious spiced potato curry with traditional Indian flavors",
    steps: [
      "Peel and cut potatoes into medium cubes, boil until 70% cooked",
      "Heat oil in a pan and add cumin seeds",
      "Add minced ginger-garlic and sauté for 30 seconds",
      "Add chopped onions and cook until golden brown",
      "Add chopped tomatoes, turmeric, and salt",
      "Cook until tomatoes are soft and oil separates",
      "Add the boiled potatoes and mix gently",
      "Cover and cook for 10 minutes, garnish with coriander",
    ],
    cookTime: "25 mins",
    difficulty: "Easy",
    servings: "3-4",
  },
  {
    id: 4,
    name: "Masala Chai",
    emoji: "☕",
    ingredients: ["milk", "tea", "ginger", "cardamom", "sugar", "cinnamon", "cloves", "water"],
    description: "Traditional Indian spiced tea with aromatic spices and creamy milk",
    steps: [
      "Boil water in a saucepan with crushed ginger and whole spices",
      "Add tea leaves and boil for 2-3 minutes until strong",
      "Add milk and bring to a rolling boil",
      "Add sugar according to taste and boil until frothy",
      "Strain the chai through a fine mesh strainer",
      "Serve hot in small glasses or cups",
      "Enjoy with biscuits or snacks",
    ],
    cookTime: "8 mins",
    difficulty: "Easy",
    servings: "2",
  },
  {
    id: 5,
    name: "Bread Upma",
    emoji: "🍞",
    ingredients: ["bread", "onion", "green chili", "mustard seeds", "curry leaves", "turmeric", "oil", "salt"],
    description: "Quick and tasty breakfast made with bread and aromatic South Indian spices",
    steps: [
      "Cut bread slices into small cubes, removing crusts if desired",
      "Heat oil in a pan and add mustard seeds",
      "When seeds splutter, add curry leaves and chopped green chilies",
      "Add chopped onions and sauté until translucent",
      "Add turmeric powder and salt, mix well",
      "Add bread cubes and gently toss to coat with spices",
      "Cook for 5-7 minutes until bread is lightly toasted",
      "Garnish with coriander and serve warm",
    ],
    cookTime: "12 mins",
    difficulty: "Easy",
    servings: "2",
  },
  {
    id: 6,
    name: "Tomato Rice",
    emoji: "🍅",
    ingredients: ["rice", "tomato", "onion", "turmeric", "mustard seeds", "curry leaves", "ginger", "oil"],
    description: "Tangy and flavorful South Indian rice dish with fresh tomatoes",
    steps: [
      "Cook rice separately and keep aside to cool",
      "Heat oil in a large pan and add mustard seeds",
      "Add curry leaves, chopped ginger, and onions",
      "Sauté onions until golden brown",
      "Add chopped tomatoes and cook until they break down",
      "Add turmeric, salt, and cook until oil separates",
      "Add the cooked rice and gently mix",
      "Cook for 5 minutes and serve hot with raita",
    ],
    cookTime: "30 mins",
    difficulty: "Medium",
    servings: "3-4",
  },
  {
    id: 7,
    name: "Kheer",
    emoji: "🍮",
    ingredients: ["milk", "rice", "sugar", "cardamom", "almonds", "raisins", "saffron"],
    description: "Creamy and aromatic Indian rice pudding dessert with nuts and saffron",
    steps: [
      "Boil full-fat milk in a heavy-bottomed pan, stirring occasionally",
      "Add washed rice and cook on medium heat until rice is soft",
      "Stir frequently to prevent sticking and burning",
      "Add sugar and cardamom powder, mix well",
      "Cook until the mixture thickens to pudding consistency",
      "Add soaked saffron, chopped almonds, and raisins",
      "Cook for 5 more minutes and serve warm or chilled",
    ],
    cookTime: "45 mins",
    difficulty: "Medium",
    servings: "4-5",
  },
  {
    id: 8,
    name: "Poha",
    emoji: "🥣",
    ingredients: ["poha", "onion", "potato", "turmeric", "mustard seeds", "curry leaves", "peanuts", "oil"],
    description: "Light and nutritious flattened rice breakfast with vegetables and spices",
    steps: [
      "Rinse poha in water until soft, drain well and keep aside",
      "Heat oil in a pan and add mustard seeds and peanuts",
      "Add curry leaves and let them splutter",
      "Add chopped onions and diced potatoes",
      "Cook until potatoes are tender and onions are golden",
      "Add turmeric powder and salt, mix well",
      "Add the drained poha and gently mix",
      "Cook for 5 minutes, garnish with coriander and lemon juice",
    ],
    cookTime: "15 mins",
    difficulty: "Easy",
    servings: "2-3",
  },
  {
    id: 9,
    name: "Dal Tadka",
    emoji: "🫘",
    ingredients: ["lentils", "onion", "tomato", "garlic", "cumin", "turmeric", "coriander", "ghee"],
    description: "Comforting spiced lentil curry with aromatic tempering",
    steps: [
      "Pressure cook lentils with turmeric and salt until soft",
      "Heat ghee in a pan and add cumin seeds",
      "Add minced garlic and chopped onions",
      "Sauté until onions are golden brown",
      "Add chopped tomatoes and cook until soft",
      "Add the cooked dal and simmer for 10 minutes",
      "Adjust consistency with water if needed",
      "Garnish with coriander and serve with rice or roti",
    ],
    cookTime: "35 mins",
    difficulty: "Medium",
    servings: "4",
  },
  {
    id: 10,
    name: "Vegetable Pulao",
    emoji: "🥕",
    ingredients: ["rice", "mixed vegetables", "onion", "garam masala", "bay leaf", "cumin", "ghee"],
    description: "Aromatic rice dish with mixed vegetables and whole spices",
    steps: [
      "Soak basmati rice for 30 minutes, then drain",
      "Heat ghee in a heavy-bottomed pot",
      "Add whole spices (bay leaf, cumin) and let them splutter",
      "Add sliced onions and sauté until golden",
      "Add mixed vegetables and cook for 5 minutes",
      "Add rice, water, and salt",
      "Bring to boil, then simmer covered for 20 minutes",
      "Let it rest for 5 minutes before serving",
    ],
    cookTime: "40 mins",
    difficulty: "Medium",
    servings: "4-5",
  },
  {
    id: 11,
    name: "Paneer Bhurji",
    emoji: "🧀",
    ingredients: ["paneer", "onion", "tomato", "green chili", "ginger", "turmeric", "cumin", "coriander"],
    description: "Scrambled cottage cheese with spices and vegetables",
    steps: [
      "Crumble paneer into small pieces",
      "Heat oil and add cumin seeds",
      "Add ginger and green chilies, sauté briefly",
      "Add onions and cook until translucent",
      "Add tomatoes and cook until soft",
      "Add turmeric, salt, and crumbled paneer",
      "Mix gently and cook for 5 minutes",
      "Garnish with coriander and serve hot",
    ],
    cookTime: "15 mins",
    difficulty: "Easy",
    servings: "2-3",
  },
  {
    id: 12,
    name: "Rajma",
    emoji: "🫘",
    ingredients: ["kidney beans", "onion", "tomato", "ginger", "garlic", "cumin", "coriander", "garam masala"],
    description: "Rich and hearty kidney bean curry in spiced tomato gravy",
    steps: [
      "Soak kidney beans overnight, then pressure cook until soft",
      "Heat oil and add cumin seeds",
      "Add ginger-garlic paste and sauté",
      "Add onions and cook until golden",
      "Add tomatoes and spices, cook until oil separates",
      "Add cooked beans with their liquid",
      "Simmer for 20 minutes until thick",
      "Garnish with coriander and serve with rice",
    ],
    cookTime: "45 mins",
    difficulty: "Medium",
    servings: "4",
  },
]

// DOM Elements
const cookButton = document.getElementById("cookButton")
const mainCookButton = document.getElementById("mainCookButton")
const backButton = document.getElementById("backButton")
const homeSection = document.getElementById("home")
const recipesSection = document.getElementById("recipes")
const ingredientInput = document.getElementById("ingredientInput")
const findRecipesButton = document.getElementById("findRecipesButton")
const loadingState = document.getElementById("loadingState")
const resultsSection = document.getElementById("resultsSection")
const noResults = document.getElementById("noResults")
const recipeGrid = document.getElementById("recipeGrid")
const tryAgainButton = document.getElementById("tryAgainButton")
const ingredientSuggestions = document.querySelectorAll(".ingredient-suggestion")

// State Management
let currentRecipes = []
let isSearching = false

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Navigation event listeners
  cookButton.addEventListener("click", showRecipeSection)
  mainCookButton.addEventListener("click", showRecipeSection)
  backButton.addEventListener("click", showHomeSection)

  // Recipe search event listeners
  findRecipesButton.addEventListener("click", handleRecipeSearch)
  ingredientInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleRecipeSearch()
    }
  })

  // Try again button
  tryAgainButton.addEventListener("click", () => {
    ingredientInput.focus()
    hideAllStates()
  })

  // Ingredient suggestions
  ingredientSuggestions.forEach((button) => {
    button.addEventListener("click", function () {
      const ingredients = this.getAttribute("data-ingredients")
      ingredientInput.value = ingredients
      handleRecipeSearch()
    })
  })

  // Auto-focus on ingredient input when recipe section is shown
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target === recipesSection && !recipesSection.classList.contains("hidden")) {
        setTimeout(() => ingredientInput.focus(), 100)
      }
    })
  })

  observer.observe(recipesSection, { attributes: true, attributeFilter: ["class"] })
}

// Navigation Functions
function showRecipeSection() {
  homeSection.classList.add("hidden")
  recipesSection.classList.remove("hidden")
  hideAllStates()
  ingredientInput.value = ""
  ingredientInput.focus()
}

function showHomeSection() {
  recipesSection.classList.add("hidden")
  homeSection.classList.remove("hidden")
  hideAllStates()
}

// Recipe Search Functions
function handleRecipeSearch() {
  const ingredients = ingredientInput.value.trim()

  if (!ingredients) {
    alert("Please enter some ingredients first!")
    ingredientInput.focus()
    return
  }

  if (isSearching) return

  findRecipes(ingredients)
}

function findRecipes(ingredientsString) {
  if (isSearching) return

  isSearching = true
  showLoadingState()

  // Simulate API delay for better UX
  setTimeout(() => {
    const userIngredients = ingredientsString
      .toLowerCase()
      .split(",")
      .map((ingredient) => ingredient.trim())
      .filter((ingredient) => ingredient.length > 0)

    const matchedRecipes = findMatchingRecipes(userIngredients)

    isSearching = false
    hideLoadingState()

    if (matchedRecipes.length > 0) {
      displayRecipes(matchedRecipes)
    } else {
      showNoResults()
    }
  }, 1200) // Realistic loading time
}

function findMatchingRecipes(userIngredients) {
  const matchedRecipes = []

  recipes.forEach((recipe) => {
    const matchCount = userIngredients.filter((userIngredient) =>
      recipe.ingredients.some(
        (recipeIngredient) =>
          recipeIngredient.toLowerCase().includes(userIngredient) ||
          userIngredient.includes(recipeIngredient.toLowerCase()),
      ),
    ).length

    if (matchCount > 0) {
      const matchPercentage = Math.round((matchCount / userIngredients.length) * 100)
      const availabilityScore = Math.round((matchCount / recipe.ingredients.length) * 100)

      matchedRecipes.push({
        ...recipe,
        matchCount,
        matchPercentage,
        availabilityScore,
        missingIngredients: recipe.ingredients.filter(
          (ingredient) =>
            !userIngredients.some(
              (userIngredient) =>
                ingredient.toLowerCase().includes(userIngredient) || userIngredient.includes(ingredient.toLowerCase()),
            ),
        ),
      })
    }
  })

  // Sort by match count (descending) and then by availability score
  matchedRecipes.sort((a, b) => {
    if (b.matchCount !== a.matchCount) {
      return b.matchCount - a.matchCount
    }
    return b.availabilityScore - a.availabilityScore
  })

  // Return top 5 recipes
  return matchedRecipes.slice(0, 5)
}

// Display Functions
function displayRecipes(recipes) {
  currentRecipes = recipes
  recipeGrid.innerHTML = ""

  recipes.forEach((recipe, index) => {
    const recipeCard = createRecipeCard(recipe, index)
    recipeGrid.appendChild(recipeCard)
  })

  showResultsSection()
}

function createRecipeCard(recipe, index) {
  const card = document.createElement("div")
  card.className = "recipe-card bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 fade-in"
  card.style.animationDelay = `${index * 0.1}s`

  const missingCount = recipe.missingIngredients.length
  const totalIngredients = recipe.ingredients.length
  const availableCount = totalIngredients - missingCount

  card.innerHTML = `
        <div class="flex items-start justify-between mb-4">
            <div class="text-4xl">${recipe.emoji}</div>
            <div class="text-right">
                <div class="text-xs font-semibold text-recipe-orange bg-orange-100 px-2 py-1 rounded-full">
                    ${recipe.matchPercentage}% Match
                </div>
                <div class="text-xs text-gray-500 mt-1">
                    ${recipe.cookTime} • ${recipe.difficulty}
                </div>
            </div>
        </div>
        
        <h3 class="text-xl font-bold text-recipe-dark mb-2">${recipe.name}</h3>
        <p class="text-gray-600 text-sm mb-4 leading-relaxed">${recipe.description}</p>
        
        <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
                <h4 class="font-semibold text-recipe-dark text-sm">Ingredients:</h4>
                <span class="text-xs text-gray-500">${availableCount}/${totalIngredients} available</span>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
                ${recipe.ingredients
                  .slice(0, 6)
                  .map((ingredient) => {
                    const isAvailable = !recipe.missingIngredients.includes(ingredient)
                    return `<span class="ingredient-tag ${isAvailable ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}">${ingredient}</span>`
                  })
                  .join("")}
                ${recipe.ingredients.length > 6 ? `<span class="text-xs text-gray-500 self-center">+${recipe.ingredients.length - 6} more</span>` : ""}
            </div>
            ${
              missingCount > 0
                ? `
                <p class="text-xs text-red-600">
                    Missing: ${recipe.missingIngredients.slice(0, 3).join(", ")}${missingCount > 3 ? ` +${missingCount - 3} more` : ""}
                </p>
            `
                : ""
            }
        </div>
        
        <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
            <span>👥 Serves ${recipe.servings}</span>
            <span>⏱️ ${recipe.cookTime}</span>
            <span>📊 ${recipe.difficulty}</span>
        </div>
        
        <button 
            onclick="toggleRecipeSteps(${recipe.id})" 
            class="w-full bg-recipe-orange text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors transform hover:scale-105"
        >
            View Cooking Steps
        </button>
        
        <div id="steps-${recipe.id}" class="hidden mt-6 pt-4 border-t border-gray-100">
            <h4 class="font-semibold text-recipe-dark mb-3 text-sm flex items-center">
                👨‍🍳 Cooking Instructions:
            </h4>
            <ol class="recipe-steps text-sm text-gray-700 space-y-2">
                ${recipe.steps.map((step) => `<li class="recipe-step">${step}</li>`).join("")}
            </ol>
            <div class="mt-4 p-3 bg-recipe-light rounded-lg">
                <p class="text-xs text-gray-600">
                    💡 <strong>Tip:</strong> Taste and adjust seasoning as needed. Cooking times may vary based on your stove and cookware.
                </p>
            </div>
        </div>
    `

  return card
}

// Recipe Steps Toggle
function toggleRecipeSteps(recipeId) {
  const stepsDiv = document.getElementById(`steps-${recipeId}`)
  const button = stepsDiv.previousElementSibling

  if (stepsDiv.classList.contains("hidden")) {
    stepsDiv.classList.remove("hidden")
    stepsDiv.classList.add("scale-in")
    button.textContent = "Hide Cooking Steps"
    button.classList.add("bg-gray-500")
    button.classList.remove("bg-recipe-orange")
  } else {
    stepsDiv.classList.add("hidden")
    stepsDiv.classList.remove("scale-in")
    button.textContent = "View Cooking Steps"
    button.classList.remove("bg-gray-500")
    button.classList.add("bg-recipe-orange")
  }
}

// State Management Functions
function showLoadingState() {
  hideAllStates()
  loadingState.classList.remove("hidden")
}

function hideLoadingState() {
  loadingState.classList.add("hidden")
}

function showResultsSection() {
  hideAllStates()
  resultsSection.classList.remove("hidden")
}

function showNoResults() {
  hideAllStates()
  noResults.classList.remove("hidden")
}

function hideAllStates() {
  loadingState.classList.add("hidden")
  resultsSection.classList.add("hidden")
  noResults.classList.add("hidden")
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Analytics and Performance (placeholder for future implementation)
function trackRecipeView(recipeId) {
  // TODO: Implement analytics tracking
  console.log(`Recipe viewed: ${recipeId}`)
}

function trackSearch(ingredients) {
  // TODO: Implement search analytics
  console.log(`Search performed: ${ingredients}`)
}

// Export functions for potential future use
window.RecipeFinder = {
  findRecipes,
  toggleRecipeSteps,
  showRecipeSection,
  showHomeSection,
}

// Service Worker Registration (for future PWA implementation)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // TODO: Register service worker for offline functionality
    console.log("Service Worker support detected")
  })
}
