// Cloudflare Worker for Recipe API
// Deploy this to Cloudflare Workers for serverless backend

interface RecipeRequest {
  ingredients: string
  mealCount: number
  language: string
}

// Environment variables needed:
// UNSPLASH_ACCESS_KEY - Unsplash API key
// OPENAI_API_KEY - OpenAI API key (optional for enhanced recipe generation)

const ingredientMapping: Record<string, string> = {
  pyaz: "onion",
  ande: "eggs",
  doodh: "milk",
  aloo: "potato",
  tamatar: "tomato",
  mirch: "chili",
  namak: "salt",
  tel: "oil",
  jeera: "cumin",
  haldi: "turmeric",
  dhaniya: "coriander",
  adrak: "ginger",
  lehsun: "garlic",
  chawal: "rice",
  dal: "lentils",
  paneer: "cottage cheese",
  sabzi: "vegetables",
  masala: "spices",
  "garam masala": "garam masala",
  "hari mirch": "green chili",
  "lal mirch": "red chili",
  "kala namak": "black salt",
  "sarson ka tel": "mustard oil",
  ghee: "clarified butter",
  makhan: "butter",
  dahi: "yogurt",
  chini: "sugar",
  gud: "jaggery",
  atta: "wheat flour",
  maida: "refined flour",
  besan: "gram flour",
}

const recipeDatabase = [
  {
    name: "Masala Scrambled Eggs",
    nameHindi: "मसाला अंडे",
    ingredients: [
      "2 eggs",
      "1 onion (chopped)",
      "1 tomato (chopped)",
      "1 tsp turmeric",
      "1 tsp cumin seeds",
      "2 tbsp oil",
      "Salt to taste",
      "Fresh coriander",
    ],
    instructions: [
      "Heat oil in a pan and add cumin seeds",
      "Add chopped onions and sauté until golden",
      "Add tomatoes and cook until soft",
      "Add turmeric and salt, mix well",
      "Beat eggs and pour into the pan",
      "Scramble gently until cooked",
      "Garnish with coriander and serve hot",
    ],
    cookTime: "10 mins",
    difficulty: "Easy",
    serves: 2,
    keywords: ["egg", "onion", "tomato", "turmeric", "cumin"],
  },
  {
    name: "Jeera Rice",
    nameHindi: "जीरा चावल",
    ingredients: [
      "1 cup basmati rice",
      "2 tsp cumin seeds",
      "2 bay leaves",
      "1 onion (sliced)",
      "2 tbsp ghee",
      "2 cups water",
      "Salt to taste",
    ],
    instructions: [
      "Wash and soak rice for 30 minutes",
      "Heat ghee in a pot, add cumin seeds and bay leaves",
      "Add sliced onions and sauté until light brown",
      "Add rice and gently mix for 2 minutes",
      "Add water and salt, bring to boil",
      "Cover and cook on low heat for 15 minutes",
      "Let it rest for 5 minutes before serving",
    ],
    cookTime: "25 mins",
    difficulty: "Easy",
    serves: 4,
    keywords: ["rice", "cumin", "bay leaf", "onion", "ghee"],
  },
  {
    name: "Aloo Sabzi",
    nameHindi: "आलू सब्जी",
    ingredients: [
      "4 potatoes (cubed)",
      "1 onion (chopped)",
      "2 tomatoes (chopped)",
      "1 tsp turmeric",
      "1 tsp cumin seeds",
      "2 tbsp oil",
      "Salt to taste",
      "Coriander leaves",
    ],
    instructions: [
      "Boil potatoes until 70% cooked",
      "Heat oil and add cumin seeds",
      "Add onions and cook until golden",
      "Add tomatoes, turmeric, and salt",
      "Cook until tomatoes are soft",
      "Add boiled potatoes and mix gently",
      "Cover and cook for 10 minutes",
      "Garnish with coriander",
    ],
    cookTime: "25 mins",
    difficulty: "Easy",
    serves: 3,
    keywords: ["potato", "onion", "tomato", "turmeric", "cumin"],
  },
]

function normalizeIngredients(input: string): string[] {
  let result = input.toLowerCase()

  Object.entries(ingredientMapping).forEach(([hinglish, english]) => {
    const regex = new RegExp(`\\b${hinglish}\\b`, "gi")
    result = result.replace(regex, english)
  })

  return result
    .split(",")
    .map((item) => {
      return item
        .trim()
        .replace(/^\d+\s*/, "")
        .replace(/\s*(cup|cups|tsp|tbsp|kg|gm|ml|liter|piece|pieces)\s*/gi, "")
        .replace(/\s*(chopped|diced|sliced|minced|grated|crushed)\s*/gi, "")
        .trim()
    })
    .filter((item) => item.length > 0)
}

async function fetchRecipeImage(recipeName: string, env: any): Promise<string> {
  try {
    const query = encodeURIComponent(`${recipeName} indian food`)
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${env.UNSPLASH_ACCESS_KEY}`,
        },
      },
    )

    if (response.ok) {
      const data = await response.json()
      if (data.results && data.results.length > 0) {
        return data.results[0].urls.regular
      }
    }
  } catch (error) {
    console.error("Error fetching image:", error)
  }

  return `https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop`
}

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    // Handle CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      })
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 })
    }

    try {
      const body: RecipeRequest = await request.json()
      const { ingredients, mealCount } = body

      const normalizedIngredients = normalizeIngredients(ingredients)

      const matchedRecipes = recipeDatabase
        .map((recipe, index) => {
          const matchCount = normalizedIngredients.filter((userIng) =>
            recipe.keywords.some(
              (keyword) =>
                keyword.toLowerCase().includes(userIng.toLowerCase()) ||
                userIng.toLowerCase().includes(keyword.toLowerCase()),
            ),
          ).length

          if (matchCount > 0) {
            return {
              id: `recipe-${index}-${Date.now()}`,
              ...recipe,
              matchScore: (matchCount / normalizedIngredients.length) * 100,
            }
          }
          return null
        })
        .filter(Boolean)
        .sort((a: any, b: any) => b.matchScore - a.matchScore)
        .slice(0, mealCount)

      const recipesWithImages = await Promise.all(
        matchedRecipes.map(async (recipe: any) => ({
          ...recipe,
          image: await fetchRecipeImage(recipe.name, env),
        })),
      )

      return new Response(
        JSON.stringify({
          success: true,
          recipes: recipesWithImages,
          normalizedIngredients,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      )
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to process recipe request",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      )
    }
  },
}
