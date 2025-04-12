"use client"

const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4 py-10">
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-3xl shadow-xl p-8 sm:p-10 text-center">
        {/* Icons in Landing page */}
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Sentence Construction</h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8">
          Select the correct words to complete the sentence by arranging the options in the right order.
        </p>

        {/* Game details */}
        <div className="grid grid-cols-3 divide-x divide-gray-200 bg-gray-50 rounded-xl overflow-hidden text-sm sm:text-base shadow-inner">
          <div className="p-4">
            <p className="font-semibold text-gray-800">Time</p>
            <p className="text-gray-500 mt-1">60 Sec</p>
          </div>
          <div className="p-4">
            <p className="font-semibold text-gray-800">Questions</p>
            <p className="text-gray-500 mt-1">10</p>
          </div>
          <div className="p-4">
            <p className="font-semibold text-gray-800">Coins</p>
            <div className="flex justify-center items-center gap-1 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block"></span>
              <span className="text-gray-500">0</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <button className="px-6 py-2.5 rounded-xl border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition-all duration-200">
            Back
          </button>
          <button
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
            onClick={onStart}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
