export function ConversionCTA() {
  return (
    <div className="max-w-4xl mx-auto mt-16">
      {/* Main CTA Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200 mb-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Loved these recipes but short on time?</h3>
          <p className="text-lg text-gray-700 mb-2">
            Order a personal chef from Dinezzy to cook fresh, homemade meals for you!
          </p>
          <p className="text-base text-gray-600 mb-6">रेसिपी पसंद आई लेकिन समय नहीं है? दिनेज़ी से पर्सनल शेफ़ मंगवाएं!</p>

          <a
            href="https://dinezzy.com/order"
            className="inline-block bg-[#FF6B35] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Order Your Chef Now 👨‍🍳
          </a>

          <p className="text-sm text-gray-600 mt-4">Experience hassle-free cooking. Fresh meals, no stress.</p>
        </div>
      </div>

      {/* Social Proof */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-semibold text-[#FF6B35]">Thousands in Patna</span> trust Dinezzy for home-cooked meals
        </p>

        {/* Value Proposition Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-semibold text-gray-900 mb-1">Save Time</h4>
            <p className="text-sm text-gray-600">No shopping, chopping, or cleaning</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl mb-2">👨‍🍳</div>
            <h4 className="font-semibold text-gray-900 mb-1">Expert Chefs</h4>
            <p className="text-sm text-gray-600">Certified professional cooking</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl mb-2">💰</div>
            <h4 className="font-semibold text-gray-900 mb-1">Great Value</h4>
            <p className="text-sm text-gray-600">₹150-175 per person only</p>
          </div>
        </div>
      </div>

      {/* Sticky CTA for Mobile */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
        <a
          href="https://dinezzy.com/order"
          className="block bg-[#FF6B35] text-white text-center py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition-colors"
        >
          Order Chef Service - ₹150/person
        </a>
      </div>
    </div>
  )
}
