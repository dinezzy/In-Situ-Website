import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { groq } from "@ai-sdk/groq"
import { z } from "zod"

// Types
interface RecipeRequest {
  ingredients: string
  mealCount: number
  language: string
  allowExtraIngredients: boolean
}

// Enhanced spelling correction mapping
const spellingCorrections: Record<string, string> = {
  // Common Hinglish misspellings
  piaz: "pyaz",
  piyaz: "pyaz",
  onoin: "onion",
  onon: "onion",
  anda: "ande",
  andey: "ande",
  eggs: "ande",
  dudh: "doodh",
  dud: "doodh",
  milk: "doodh",
  alu: "aloo",
  allu: "aloo",
  potato: "aloo",
  potatos: "aloo",
  tamater: "tamatar",
  tomato: "tamatar",
  tomatos: "tamatar",
  mirchi: "mirch",
  chili: "mirch",
  chilli: "mirch",
  namac: "namak",
  salt: "namak",
  oil: "tel",
  jeera: "jeera",
  cumin: "jeera",
  haldi: "haldi",
  turmeric: "haldi",
  dhaniya: "dhaniya",
  coriander: "dhaniya",
  adrak: "adrak",
  ginger: "adrak",
  lehsun: "lehsun",
  garlic: "lehsun",
  chaval: "chawal",
  rice: "chawal",
  dal: "dal",
  lentils: "dal",
  panir: "paneer",
  paner: "paneer",
  "cottage cheese": "paneer",

  // Hindi spelling corrections
  प्याज़: "प्याज",
  अंडे: "अंडे",
  दूध: "दूध",
  आलू: "आलू",
  टमाटर: "टमाटर",
  मिर्च: "मिर्च",
  नमक: "नमक",
  तेल: "तेल",
  जीरा: "जीरा",
  हल्दी: "हल्दी",
  धनिया: "धनिया",
  अदरक: "अदरक",
  लहसुन: "लहसुन",
  चावल: "चावल",
  दाल: "दाल",
  पनीर: "पनीर",
}

// Language normalization mapping
const ingredientMapping: Record<string, string> = {
  // Hinglish to English
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
  "safed namak": "white salt",
  "sarson ka tel": "mustard oil",
  ghee: "clarified butter",
  makhan: "butter",
  dahi: "yogurt",
  chini: "sugar",
  gud: "jaggery",
  atta: "wheat flour",
  maida: "refined flour",
  besan: "gram flour",
  suji: "semolina",
  poha: "flattened rice",
}

// Function to correct spelling and normalize
function correctSpellingAndNormalize(input: string): { corrected: string; normalized: string } {
  let corrected = input.toLowerCase()

  // Apply spelling corrections first
  Object.entries(spellingCorrections).forEach(([wrong, correct]) => {
    const regex = new RegExp(`\\b${wrong}\\b`, "gi")
    corrected = corrected.replace(regex, correct)
  })

  let normalized = corrected

  // Apply ingredient mapping
  Object.entries(ingredientMapping).forEach(([hinglish, english]) => {
    const regex = new RegExp(`\\b${hinglish}\\b`, "gi")
    normalized = normalized.replace(regex, english)
  })

  return { corrected, normalized }
}

// Function to capitalize ingredients properly
function capitalizeIngredients(ingredients: string): string {
  return ingredients
    .split(",")
    .map((ingredient) => {
      return ingredient
        .trim()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
    })
    .join(", ")
}

// More flexible Recipe schema
const RecipeSchema = z.object({
  recipes: z
    .array(
      z.object({
        name: z.string().min(1),
        nameHindi: z.string().min(1),
        ingredients: z.array(z.string().min(1)).min(1),
        instructions: z.array(z.string().min(1)).min(1),
        cookTime: z.string().min(1),
        difficulty: z.enum(["Easy", "Medium", "Hard"]).default("Easy"),
        serves: z.number().min(1).max(10).default(2),
        description: z.string().min(1),
        mealType: z.string().min(1),
      }),
    )
    .min(1),
})

async function generateRecipesWithGroq(
  ingredients: string,
  mealCount: number,
  language: string,
  allowExtraIngredients: boolean,
) {
  // Check if Groq API key is available
  if (!process.env.GROQ_API_KEY) {
    console.log("GROQ_API_KEY not available, using fallback recipes")
    throw new Error("GROQ_API_KEY environment variable is not set")
  }

  // Use a currently supported Groq model
  const groqModel = groq("llama-3.1-8b-instant")

  // Extra ingredients constraint
  const extraIngredientsInstruction = allowExtraIngredients
    ? "You can include additional common ingredients like eggs, paneer, meat, cheese."
    : "ONLY use the provided ingredients plus basic spices (salt, turmeric, cumin, coriander, oil). Do NOT add eggs, paneer, meat, or cheese."

  // Simplified prompt for better success rate
  const prompt = `Generate ${Math.min(mealCount * 3, 5)} Indian recipes using: ${ingredients}

${extraIngredientsInstruction}

Return ONLY a JSON object with this exact structure:
{
  "recipes": [
    {
      "name": "Recipe Name",
      "nameHindi": "हिंदी नाम",
      "ingredients": ["1 cup rice", "1 tsp salt"],
      "instructions": ["Step 1", "Step 2", "Step 3"],
      "cookTime": "20 mins",
      "difficulty": "Easy",
      "serves": 2,
      "description": "Brief description",
      "mealType": "Lunch"
    }
  ]
}

Make recipes practical and authentic. Use proper Hindi spelling.`

  try {
    console.log("Attempting Groq API call...")

    const result = await generateObject({
      model: groqModel,
      schema: RecipeSchema,
      prompt,
      temperature: 0.1, // Lower temperature for more consistent output
      maxRetries: 1,
    })

    if (!result.object?.recipes || result.object.recipes.length === 0) {
      throw new Error("No recipes in response")
    }

    console.log(`Successfully generated ${result.object.recipes.length} recipes`)
    return result.object.recipes
  } catch (error) {
    console.error("Groq generation failed:", error)

    // Try a much simpler approach
    try {
      console.log("Trying simplified approach...")

      const simplePrompt = `Create 3 Indian recipes with: ${ingredients}

Return JSON:
{
  "recipes": [
    {
      "name": "Simple Rice",
      "nameHindi": "सादा चावल", 
      "ingredients": ["1 cup rice", "2 cups water"],
      "instructions": ["Boil water", "Add rice", "Cook 15 mins"],
      "cookTime": "20 mins",
      "difficulty": "Easy",
      "serves": 2,
      "description": "Basic rice dish",
      "mealType": "Lunch"
    }
  ]
}`

      const simpleResult = await generateObject({
        model: groqModel,
        schema: RecipeSchema,
        prompt: simplePrompt,
        temperature: 0.1,
        maxRetries: 1,
      })

      if (simpleResult.object?.recipes && simpleResult.object.recipes.length > 0) {
        console.log("Simple approach succeeded")
        return simpleResult.object.recipes
      }
    } catch (simpleError) {
      console.error("Simple approach also failed:", simpleError)
    }

    throw error
  }
}

// Enhanced Google image search function
async function fetchRecipeImageFromGoogle(recipeName: string): Promise<string> {
  try {
    // Clean the recipe name for better search results
    const cleanName = recipeName
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")
      .trim()

    // Try multiple search variations
    const searchQueries = [
      `${cleanName} indian food recipe`,
      `${cleanName} indian dish`,
      `${cleanName} recipe`,
      `indian ${cleanName}`,
    ]

    for (const query of searchQueries) {
      try {
        // Use a web scraping service or API
        // For now, we'll use a placeholder approach with known good images
        const imageUrl = await searchImageForDish(cleanName)
        if (imageUrl) {
          return imageUrl
        }
      } catch (error) {
        console.error(`Failed to fetch image for query: ${query}`, error)
        continue
      }
    }

    // Fallback to Pixabay if available
    if (process.env.PIXABAY_API_KEY) {
      try {
        const query = encodeURIComponent(`${cleanName} indian food`)
        const response = await fetch(
          `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=3&min_width=400&min_height=300`,
        )

        if (response.ok) {
          const data = await response.json()
          if (data.hits && data.hits.length > 0) {
            return data.hits[0].webformatURL
          }
        }
      } catch (error) {
        console.error("Pixabay API error:", error)
      }
    }
  } catch (error) {
    console.error("Error in fetchRecipeImageFromGoogle:", error)
  }

  // Ultimate fallback
  return `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(recipeName)}`
}

// Enhanced image search with better mapping
async function searchImageForDish(dishName: string): Promise<string | null> {
  // Comprehensive mapping of Indian dishes to high-quality images
  const dishImageMap: Record<string, string> = {
    // Rice dishes
    "jeera rice": "https://www.vegrecipesofindia.com/wp-content/uploads/2013/07/jeera-rice-recipe-1.jpg",
    "cumin rice": "https://www.vegrecipesofindia.com/wp-content/uploads/2013/07/jeera-rice-recipe-1.jpg",
    "fried rice": "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/veg-fried-rice-1.jpg",
    "vegetable rice": "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/veg-fried-rice-1.jpg",
    "tomato rice": "https://www.vegrecipesofindia.com/wp-content/uploads/2014/06/tomato-rice-recipe-1.jpg",
    "lemon rice": "https://www.vegrecipesofindia.com/wp-content/uploads/2014/06/lemon-rice-recipe-1.jpg",
    biryani: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/vegetable-biryani-recipe.jpg",
    pulao: "https://www.vegrecipesofindia.com/wp-content/uploads/2017/12/veg-pulao-recipe-1.jpg",

    // Dal and lentils
    "dal tadka": "https://www.vegrecipesofindia.com/wp-content/uploads/2017/12/dal-tadka-recipe-1.jpg",
    "dal fry": "https://www.vegrecipesofindia.com/wp-content/uploads/2017/12/dal-fry-recipe-1.jpg",
    "moong dal": "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/moong-dal-recipe-1.jpg",
    "toor dal": "https://www.vegrecipesofindia.com/wp-content/uploads/2017/12/dal-tadka-recipe-1.jpg",
    "masoor dal": "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/masoor-dal-recipe-1.jpg",

    // Potato dishes
    "aloo sabzi": "https://www.vegrecipesofindia.com/wp-content/uploads/2014/11/aloo-sabzi-recipe-1.jpg",
    "aloo curry": "https://www.vegrecipesofindia.com/wp-content/uploads/2014/11/aloo-sabzi-recipe-1.jpg",
    "aloo gobi": "https://www.vegrecipesofindia.com/wp-content/uploads/2014/11/aloo-gobi-recipe-1.jpg",
    "aloo paratha": "https://www.vegrecipesofindia.com/wp-content/uploads/2019/01/aloo-paratha-recipe-1.jpg",
    "potato curry": "https://www.vegrecipesofindia.com/wp-content/uploads/2014/11/aloo-sabzi-recipe-1.jpg",

    // Paneer dishes
    "paneer bhurji": "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-bhurji-recipe-1.jpg",
    "paneer curry": "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-curry-recipe-1.jpg",
    "paneer tikka": "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-tikka-recipe-1.jpg",
    "palak paneer": "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/palak-paneer-recipe-1.jpg",

    // Egg dishes
    "masala omelette": "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/06/masala-omelette-recipe.jpg",
    "egg curry": "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/06/egg-curry-recipe.jpg",
    "scrambled eggs": "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/06/masala-omelette-recipe.jpg",

    // Breakfast items
    poha: "https://www.vegrecipesofindia.com/wp-content/uploads/2021/12/poha-recipe-1.jpg",
    upma: "https://www.vegrecipesofindia.com/wp-content/uploads/2022/06/upma-recipe-1.jpg",
    idli: "https://www.vegrecipesofindia.com/wp-content/uploads/2022/04/idli-recipe-1.jpg",
    dosa: "https://www.vegrecipesofindia.com/wp-content/uploads/2021/07/masala-dosa-1.jpg",
    "bread upma": "https://www.vegrecipesofindia.com/wp-content/uploads/2022/06/bread-upma-recipe-1.jpg",

    // Beverages
    "masala chai": "https://www.vegrecipesofindia.com/wp-content/uploads/2022/03/masala-chai-recipe-1.jpg",
    "ginger tea": "https://www.vegrecipesofindia.com/wp-content/uploads/2022/03/ginger-tea-recipe-1.jpg",
    chai: "https://www.vegrecipesofindia.com/wp-content/uploads/2022/03/masala-chai-recipe-1.jpg",

    // Vegetables
    "mixed vegetables": "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/mixed-vegetable-curry-1.jpg",
    "vegetable curry": "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/mixed-vegetable-curry-1.jpg",
    "cabbage sabzi": "https://www.vegrecipesofindia.com/wp-content/uploads/2014/11/cabbage-sabzi-recipe-1.jpg",
    "cauliflower curry": "https://www.vegrecipesofindia.com/wp-content/uploads/2014/11/aloo-gobi-recipe-1.jpg",

    // Bread
    roti: "https://www.vegrecipesofindia.com/wp-content/uploads/2022/03/chapati-recipe-1.jpg",
    chapati: "https://www.vegrecipesofindia.com/wp-content/uploads/2022/03/chapati-recipe-1.jpg",
    paratha: "https://www.vegrecipesofindia.com/wp-content/uploads/2019/01/aloo-paratha-recipe-1.jpg",
    naan: "https://www.vegrecipesofindia.com/wp-content/uploads/2022/05/naan-recipe-1.jpg",

    // Snacks
    samosa: "https://www.vegrecipesofindia.com/wp-content/uploads/2019/11/samosa-recipe-1.jpg",
    pakora: "https://www.vegrecipesofindia.com/wp-content/uploads/2022/06/pakora-recipe-1.jpg",
    "onion pakora": "https://www.vegrecipesofindia.com/wp-content/uploads/2022/06/onion-pakora-recipe-1.jpg",

    // Desserts
    kheer: "https://www.vegrecipesofindia.com/wp-content/uploads/2014/09/rice-kheer-recipe-1.jpg",
    "rice pudding": "https://www.vegrecipesofindia.com/wp-content/uploads/2014/09/rice-kheer-recipe-1.jpg",
    halwa: "https://www.vegrecipesofindia.com/wp-content/uploads/2022/03/suji-halwa-recipe-1.jpg",
  }

  // Check for exact matches first
  if (dishImageMap[dishName]) {
    return dishImageMap[dishName]
  }

  // Check for partial matches
  for (const [key, url] of Object.entries(dishImageMap)) {
    if (dishName.includes(key) || key.includes(dishName)) {
      return url
    }
  }

  return null
}

// Enhanced fallback recipes with proper structure
const generateFallbackRecipes = (mealCount: number, allowExtraIngredients: boolean) => {
  const basicRecipes = [
    {
      name: "Simple Jeera Rice",
      nameHindi: "सादा जीरा चावल",
      ingredients: ["1 Cup Basmati Rice", "2 Cups Water", "1 Tsp Cumin Seeds", "1 Tsp Salt", "2 Tbsp Ghee"],
      instructions: [
        "Wash rice thoroughly until water runs clear",
        "Heat ghee in a heavy-bottomed pot over medium heat",
        "Add cumin seeds and let them splutter for 30 seconds",
        "Add washed rice and gently mix for 2 minutes",
        "Add water and salt, bring to a rolling boil",
        "Cover and cook on low heat for 15 minutes",
        "Let it rest for 5 minutes before serving",
      ],
      cookTime: "25 mins",
      difficulty: "Easy" as const,
      serves: 3,
      description: "Fragrant cumin-flavored basmati rice",
      mealType: "Lunch",
    },
    {
      name: "Spiced Onion Sabzi",
      nameHindi: "मसालेदार प्याज़ सब्जी",
      ingredients: ["3 Large Onions Sliced", "2 Tbsp Oil", "1 Tsp Turmeric", "1 Tsp Cumin Seeds", "Salt To Taste"],
      instructions: [
        "Heat oil in a wide pan over medium heat",
        "Add cumin seeds and let them splutter",
        "Add sliced onions and cook until soft and translucent",
        "Add turmeric powder and salt, mix well",
        "Cook until onions are golden brown and caramelized",
        "Serve hot with rice or roti",
      ],
      cookTime: "15 mins",
      difficulty: "Easy" as const,
      serves: 2,
      description: "Simple and flavorful spiced onion curry",
      mealType: "Lunch",
    },
    {
      name: "Crispy Potato Fry",
      nameHindi: "कुरकुरा आलू फ्राई",
      ingredients: ["4 Medium Potatoes Cubed", "3 Tbsp Oil", "1 Tsp Cumin Seeds", "1 Tsp Turmeric", "Salt To Taste"],
      instructions: [
        "Heat oil in a non-stick pan over medium-high heat",
        "Add cumin seeds and let them splutter",
        "Add potato cubes and mix well to coat with oil",
        "Add turmeric powder and salt, mix gently",
        "Cook covered for 10 minutes, stirring occasionally",
        "Remove cover and cook until potatoes are golden and crispy",
        "Serve hot as a side dish",
      ],
      cookTime: "20 mins",
      difficulty: "Easy" as const,
      serves: 3,
      description: "Crispy and golden spiced potato fry",
      mealType: "Dinner",
    },
    {
      name: "Simple Dal Tadka",
      nameHindi: "सादा दाल तड़का",
      ingredients: [
        "1 Cup Toor Dal",
        "2 Cups Water",
        "1 Tsp Turmeric",
        "1 Tsp Cumin Seeds",
        "2 Tbsp Oil",
        "Salt To Taste",
      ],
      instructions: [
        "Wash dal thoroughly and pressure cook with turmeric and salt",
        "Heat oil in a pan and add cumin seeds",
        "Let cumin seeds splutter and turn golden",
        "Add cooked dal and mix well",
        "Simmer for 10 minutes until desired consistency",
        "Garnish with fresh coriander and serve hot",
      ],
      cookTime: "30 mins",
      difficulty: "Easy" as const,
      serves: 4,
      description: "Comforting spiced lentil curry",
      mealType: "Lunch",
    },
    {
      name: "Masala Chai",
      nameHindi: "मसाला चाय",
      ingredients: ["2 Cups Water", "1 Cup Milk", "2 Tsp Tea Leaves", "2 Tsp Sugar", "1 Inch Ginger", "2 Cardamom"],
      instructions: [
        "Boil water with ginger and cardamom",
        "Add tea leaves and boil for 2 minutes",
        "Add milk and sugar",
        "Boil until frothy and well mixed",
        "Strain and serve hot",
      ],
      cookTime: "8 mins",
      difficulty: "Easy" as const,
      serves: 2,
      description: "Traditional Indian spiced tea",
      mealType: "Breakfast",
    },
  ]

  const extraIngredientRecipes = [
    {
      name: "Masala Scrambled Eggs",
      nameHindi: "मसाला भुर्जी अंडे",
      ingredients: [
        "3 Large Eggs",
        "1 Medium Onion Chopped",
        "1 Tomato Chopped",
        "2 Green Chilies",
        "2 Tbsp Oil",
        "Salt To Taste",
      ],
      instructions: [
        "Beat eggs with salt in a bowl until well combined",
        "Heat oil in a non-stick pan over medium heat",
        "Add chopped onions and green chilies, sauté until golden",
        "Add chopped tomatoes and cook until they become soft",
        "Pour beaten eggs over the vegetable mixture",
        "Scramble gently with a spatula until eggs are cooked",
        "Serve hot with bread or paratha",
      ],
      cookTime: "10 mins",
      difficulty: "Easy" as const,
      serves: 2,
      description: "Spicy Indian-style scrambled eggs with vegetables",
      mealType: "Breakfast",
    },
    {
      name: "Paneer Bhurji",
      nameHindi: "पनीर भुर्जी",
      ingredients: ["250g Paneer Crumbled", "1 Onion Chopped", "1 Tomato Chopped", "2 Tbsp Oil", "1 Tsp Garam Masala"],
      instructions: [
        "Heat oil in a pan over medium heat",
        "Add chopped onions and cook until golden brown",
        "Add chopped tomatoes and cook until they break down",
        "Add crumbled paneer and garam masala powder",
        "Mix well and cook for 5-7 minutes",
        "Garnish with fresh coriander leaves",
        "Serve hot with roti or rice",
      ],
      cookTime: "15 mins",
      difficulty: "Easy" as const,
      serves: 3,
      description: "Spiced scrambled cottage cheese with aromatic spices",
      mealType: "Dinner",
    },
  ]

  let recipes = [...basicRecipes]
  if (allowExtraIngredients) {
    recipes = [...recipes, ...extraIngredientRecipes]
  }

  // Return appropriate number based on meal count
  const targetCount = mealCount === 1 ? 5 : mealCount === 3 ? 6 : 7
  return recipes.slice(0, Math.min(targetCount, recipes.length))
}

// Group recipes by meal type or days
function groupRecipesByMealType(recipes: any[], mealCount: number) {
  if (mealCount === 1) {
    return [{ mealType: "Recipe Options", recipes }]
  } else if (mealCount === 3) {
    // Group by meal type
    const grouped = recipes.reduce(
      (acc, recipe) => {
        const mealType = recipe.mealType || "Other"
        if (!acc[mealType]) {
          acc[mealType] = []
        }
        acc[mealType].push(recipe)
        return acc
      },
      {} as Record<string, any[]>,
    )

    // Ensure we have the right order
    const mealOrder = ["Breakfast", "Lunch", "Dinner"]
    return mealOrder
      .map((mealType) => ({
        mealType,
        recipes: grouped[mealType] || [],
      }))
      .filter((group) => group.recipes.length > 0)
  } else {
    // Group by days for weekly planner
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const recipesPerDay = Math.ceil(recipes.length / 7)

    return days
      .map((day, index) => ({
        mealType: day,
        recipes: recipes.slice(index * recipesPerDay, (index + 1) * recipesPerDay),
      }))
      .filter((group) => group.recipes.length > 0)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: RecipeRequest = await request.json()
    const { ingredients, mealCount, language, allowExtraIngredients = false } = body

    // Validate input
    if (!ingredients || ingredients.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: "Please provide some ingredients to search for recipes.",
      })
    }

    // Correct spelling and normalize ingredients
    const { corrected, normalized } = correctSpellingAndNormalize(ingredients)
    const capitalizedInput = capitalizeIngredients(corrected)

    let aiRecipes = null
    let usedFallback = false

    try {
      // Try to generate recipes using Groq AI
      console.log("Attempting AI recipe generation...")
      aiRecipes = await generateRecipesWithGroq(normalized, mealCount, language, allowExtraIngredients)
      console.log("AI generation successful")
    } catch (aiError) {
      console.error("AI generation failed, using fallback recipes:", aiError)
      usedFallback = true
      aiRecipes = generateFallbackRecipes(mealCount, allowExtraIngredients)
    }

    // Add unique IDs to recipes
    const recipesWithIds = aiRecipes.map((recipe, index) => ({
      id: `${usedFallback ? "fallback" : "groq"}-recipe-${index}-${Date.now()}`,
      ...recipe,
    }))

    // Group recipes by meal type
    const mealSets = groupRecipesByMealType(recipesWithIds, mealCount)

    return NextResponse.json({
      success: true,
      recipes: recipesWithIds || [],
      mealSets: mealSets || [],
      correctedIngredients: capitalizedInput,
      normalizedIngredients: normalized.split(",").map((i) => i.trim()),
      language,
      fallback: usedFallback,
      message: usedFallback ? "Using curated recipes - AI service temporarily unavailable" : undefined,
      totalRecipes: recipesWithIds?.length || 0,
      structure: {
        mealCount,
        recipesPerMeal: Math.ceil(recipesWithIds.length / mealCount),
        totalSets: mealSets?.length || 0,
      },
    })
  } catch (error) {
    console.error("Recipe API error:", error)

    // Final fallback - return basic recipes even if everything fails
    const emergencyRecipes = generateFallbackRecipes(1, false).slice(0, 3)
    const recipesWithIds = emergencyRecipes.map((recipe, index) => ({
      id: `emergency-${index}-${Date.now()}`,
      ...recipe,
    }))

    return NextResponse.json({
      success: true,
      recipes: recipesWithIds,
      mealSets: [{ mealType: "Emergency Recipes", recipes: recipesWithIds }],
      correctedIngredients: "Basic Ingredients",
      normalizedIngredients: ["rice", "onion", "potato"],
      language: "english",
      fallback: true,
      message: "Showing basic recipes - please try again later",
      totalRecipes: recipesWithIds.length,
      structure: {
        mealCount: 1,
        recipesPerMeal: recipesWithIds.length,
        totalSets: 1,
      },
    })
  }
}
