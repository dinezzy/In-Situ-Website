export function LoadingState() {
  return (
    <div className="max-w-4xl mx-auto text-center py-8 md:py-16">
      <div className="mb-6 md:mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-[#FF6B35] to-orange-600 rounded-full mb-4 md:mb-6 animate-pulse shadow-lg">
          <span className="text-2xl md:text-3xl text-white">🍽️</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">Finding Perfect Recipes</h2>
        <p className="text-base md:text-lg text-gray-600 mb-2">रेसिपी खोज रहे हैं... Searching through our collection...</p>
        <p className="text-sm text-gray-500">Getting high-quality results and correcting spellings...</p>
      </div>

      {/* Enhanced Loading Animation - Mobile Optimized */}
      <div className="space-y-4 md:space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-4 md:p-6 shadow-lg animate-pulse">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
              <div className="flex-1 space-y-2 md:space-y-3">
                <div className="h-4 md:h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                <div className="h-3 md:h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-8">
        <div className="flex justify-center space-x-1 md:space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-[#FF6B35] to-orange-600 rounded-full animate-bounce shadow-lg"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
        <p className="text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
          This may take 10-15 seconds for the best results...
        </p>
      </div>
    </div>
  )
}
