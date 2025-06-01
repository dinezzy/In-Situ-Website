"use client"

interface RecipeHeaderProps {
  onBack: () => void
}

export function RecipeHeader({ onBack }: RecipeHeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="text-gray-600 hover:text-[#FF6B35] transition-colors">
              ← Back
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full border-2 border-[#FF6B35] flex items-center justify-center">
                <span className="text-[#FF6B35] font-bold text-xs">D</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Dinezzy</h1>
                <p className="text-xs text-gray-500">Recipe Suggestions</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-2xl">🍽️</span>
            <span className="font-semibold text-gray-900">What Can I Cook?</span>
          </div>
        </div>
      </div>
    </header>
  )
}
