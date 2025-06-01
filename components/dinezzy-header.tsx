"use client"

interface DinezzyHeaderProps {
  onShowWidget: () => void
}

export function DinezzyHeader({ onShowWidget }: DinezzyHeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full border-2 border-[#FF6B35] flex items-center justify-center">
              <span className="text-[#FF6B35] font-bold text-sm">D</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dinezzy</h1>
              <p className="text-xs text-gray-500">Dine with Ease</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-[#FF6B35] transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-[#FF6B35] transition-colors">
              How It Works
            </a>
            <a href="#" className="text-gray-700 hover:text-[#FF6B35] transition-colors">
              Menu
            </a>
            <a href="#" className="text-gray-700 hover:text-[#FF6B35] transition-colors">
              Contact Us
            </a>
            <button
              onClick={onShowWidget}
              className="text-[#FF6B35] hover:text-orange-600 transition-colors font-medium transform hover:scale-105 duration-200"
            >
              🍽️ What Can I Cook?
            </button>
          </nav>

          <button className="bg-[#FF6B35] text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition-colors">
            Order Now
          </button>
        </div>
      </div>
    </header>
  )
}
