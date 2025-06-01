# Dinezzy Recipe Widget - Full-Stack SaaS Integration

A conversion-optimized recipe suggestion widget that seamlessly integrates with dinezzy.com, supporting Hindi/Hinglish/English inputs with dynamic API calls.

## Features

### 🌍 Multi-Language Support
- **Hindi**: देवनागरी script support
- **English**: Standard English input
- **Hinglish**: Roman script Hindi (pyaz, ande, doodh)
- Smart language detection and normalization

### 🍽️ Recipe Generation
- Dynamic ingredient-to-recipe matching
- 5+ authentic Indian recipes in database
- Real-time image fetching from Unsplash API
- Meal count selector (1, 3, or 7 recipes)

### 💰 Conversion Optimization
- Strategic CTAs after recipe results
- Social proof integration
- Value proposition highlighting
- Mobile-optimized sticky CTAs

### 🎨 Perfect Brand Integration
- Matches dinezzy.com color scheme (#FF6B35, #FFF8F3)
- Consistent typography and spacing
- Responsive design with dinezzy breakpoints
- Seamless navigation integration

## Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with dinezzy color palette
- **React Hooks** for state management

### Backend
- **Cloudflare Workers** for serverless API
- **Unsplash API** for dynamic recipe images
- **Language normalization** engine
- **Recipe matching** algorithm

## Installation & Deployment

### 1. Frontend Setup (Cloudflare Pages)

\`\`\`bash
# Clone and install dependencies
npm install

# Build for production
npm run build

# Deploy to Cloudflare Pages
# Upload the 'out' folder to Cloudflare Pages
\`\`\`

### 2. Backend Setup (Cloudflare Workers)

\`\`\`bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy the worker
wrangler deploy lib/cloudflare-worker.ts

# Set environment variables
wrangler secret put UNSPLASH_ACCESS_KEY
\`\`\`

### 3. Environment Variables

Create `.env.local` for development:

\`\`\`env
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
NEXT_PUBLIC_API_URL=https://your-worker.your-subdomain.workers.dev
\`\`\`

For Cloudflare Workers, set these secrets:
- `UNSPLASH_ACCESS_KEY`: Get from [Unsplash Developers](https://unsplash.com/developers)

## Integration with dinezzy.com

### 1. Header Integration

Add the recipe widget button to your existing header:

\`\`\`html
<button onclick="window.location.href='/recipe-widget'" class="text-[#FF6B35] hover:text-orange-600 transition-colors font-medium">
  🍽️ What Can I Cook?
</button>
\`\`\`

### 2. Modal Integration (Alternative)

For modal overlay instead of separate page:

\`\`\`javascript
// Add to your existing JavaScript
function showRecipeWidget() {
  // Load recipe widget in modal
  const modal = document.createElement('div');
  modal.innerHTML = `<iframe src="/recipe-widget" class="w-full h-full"></iframe>`;
  document.body.appendChild(modal);
}
\`\`\`

### 3. CSS Integration

The widget uses the same CSS classes as dinezzy.com:
- `bg-[#FF6B35]` for primary orange
- `bg-[#FFF8F3]` for cream background
- Same border-radius and shadow utilities

## API Documentation

### Recipe Search Endpoint

**POST** `/api/recipes`

\`\`\`json
{
  "ingredients": "1 pyaz, 2 ande, doodh",
  "mealCount": 3,
  "language": "hinglish"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "recipes": [
    {
      "id": "recipe-1",
      "name": "Masala Scrambled Eggs",
      "nameHindi": "मसाला अंडे",
      "ingredients": ["2 eggs", "1 onion", "..."],
      "instructions": ["Heat oil...", "..."],
      "image": "https://images.unsplash.com/...",
      "cookTime": "10 mins",
      "difficulty": "Easy",
      "serves": 2
    }
  ],
  "normalizedIngredients": ["onion", "eggs", "milk"],
  "language": "hinglish"
}
\`\`\`

## Language Normalization

The system automatically converts:
- **Hinglish**: `pyaz` → `onion`, `ande` → `eggs`
- **Hindi**: `आलू` → `potato`, `टमाटर` → `tomato`
- **Quantities**: Removes numbers and units
- **Preparation**: Removes "chopped", "diced", etc.

## Conversion Strategy

### 1. Soft Persuasion
- Appears only after successful recipe search
- Focuses on convenience and time-saving
- Non-intrusive design

### 2. Value Proposition
- Highlights ₹150-175 per person pricing
- Emphasizes professional chef quality
- Shows time and effort savings

### 3. Social Proof
- "Thousands in Patna trust Dinezzy"
- Customer testimonial integration
- Trust signals and certifications

## Performance Optimization

### 1. Caching Strategy
- Recipe images cached in Cloudflare
- Ingredient normalization cached
- Popular searches cached

### 2. Loading Optimization
- Skeleton loading states
- Progressive image loading
- Optimized API responses

### 3. Mobile Performance
- Lazy loading for images
- Compressed assets
- Touch-optimized interactions

## Analytics & Tracking

Add these events to track conversion:

\`\`\`javascript
// Recipe search performed
gtag('event', 'recipe_search', {
  'ingredients': normalizedIngredients.join(','),
  'language': detectedLanguage,
  'meal_count': mealCount
});

// CTA clicked
gtag('event', 'conversion_cta_click', {
  'source': 'recipe_widget',
  'recipes_shown': recipes.length
});

// Chef service ordered
gtag('event', 'purchase', {
  'source': 'recipe_widget_conversion'
});
\`\`\`

## Customization

### 1. Adding New Recipes

Edit `app/api/recipes/route.ts`:

\`\`\`typescript
const recipeDatabase = [
  // Add new recipe object
  {
    name: "New Recipe",
    nameHindi: "नई रेसिपी",
    ingredients: [...],
    instructions: [...],
    keywords: [...] // For matching
  }
]
\`\`\`

### 2. Language Support

Add new language mappings in `ingredientMapping`:

\`\`\`typescript
const ingredientMapping = {
  // Add new language mappings
  'bengali_word': 'english_equivalent',
  'tamil_word': 'english_equivalent'
}
\`\`\`

### 3. Styling Customization

Update Tailwind config for different brand colors:

\`\`\`javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'brand-primary': '#YOUR_COLOR',
        'brand-secondary': '#YOUR_COLOR'
      }
    }
  }
}
\`\`\`

## Support & Maintenance

### 1. Monitoring
- Set up Cloudflare Analytics
- Monitor API response times
- Track conversion rates

### 2. Updates
- Regular recipe database updates
- Seasonal recipe additions
- Language mapping improvements

### 3. Scaling
- Cloudflare Workers auto-scale
- Image CDN optimization
- Database caching strategies

## License

This project is proprietary to Dinezzy. All rights reserved.

## Contact

For technical support or customization requests, contact the development team.
