"use client"

import React from "react"
import { CheckCircle, XCircle, SkipForward } from "lucide-react"

const ReviewPage = ({ answers, questions, coins }) => {
  const score = answers.filter((a) => a.isCorrect).length
  const percentage = Math.round((score / questions.length) * 100)

  const getScoreMessage = () => {
    if (percentage >= 90) return "Excellent! You've mastered sentence construction."
    if (percentage >= 70) return "Great job! You have a solid understanding."
    if (percentage >= 50) return "Good effort! Keep practicing to improve."
    return "Keep practicing! You're getting there."
  }

  const getScoreColor = () => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 70) return "text-emerald-600"
    if (percentage >= 50) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-primary">Sentence Construction</h1>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="38"
                cx="48"
                cy="48"
              />
              <circle
                className={getScoreColor()}
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                strokeDasharray="240"
                strokeDashoffset={`${240 - (240 * percentage) / 100}`}
                strokeLinecap="round"
                r="38"
                cx="48"
                cy="48"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
              {percentage}
              <span className="text-sm">%</span>
            </div>
          </div>

          {/* Coins earned */}
          <div className="bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
            <span className="text-gray-700 font-medium">{coins} coins earned</span>
          </div>
        </div>
        <p className="text-gray-600 max-w-xl mx-auto">{getScoreMessage()}</p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {answers.map((answer, i) => {
          const questionText = questions[i].question
          const segments = questionText.split("_____________")

          return (
            <div key={i} className="p-5 bg-white border border-gray-200 rounded-2xl shadow hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">Question {i + 1}</h3>
                <div className="flex items-center space-x-2">
                  {answer.isCorrect ? (
                    <span className="flex items-center text-green-600 font-medium">
                      <CheckCircle className="w-5 h-5 mr-1" />
                      Correct
                    </span>
                  ) : answer.skipped ? (
                    <span className="flex items-center text-gray-500 font-medium">
                      <SkipForward className="w-5 h-5 mr-1" />
                      Skipped
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500 font-medium">
                      <XCircle className="w-5 h-5 mr-1" />
                      Incorrect
                    </span>
                  )}
                </div>
              </div>

              <div className="text-gray-800 leading-relaxed mb-4">
                {segments.map((segment, index) => (
                  <React.Fragment key={index}>
                    {segment}
                    {index < answer.answer.length && (
                      <span
                        className={`inline-block min-w-[100px] text-center mx-1 px-2 py-1 rounded font-semibold text-sm ${
                          answer.userAnswer[index] === answer.answer[index]
                            ? "bg-green-100 text-green-800"
                            : answer.skipped
                              ? "bg-gray-100 text-gray-600"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {answer.userAnswer[index] || "_______"}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {(!answer.isCorrect || answer.skipped) && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Correct Answer:</p>
                  <p className="text-green-700 font-medium">{answer.answer.join(" → ")}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-primary text-black font-semibold rounded-xl shadow hover:bg-primary/90 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default ReviewPage
