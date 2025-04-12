"use client"

import React, { useState, useEffect } from "react"
import Timer from "./Timer"
import { ArrowRight, SkipForward } from "lucide-react"

const QuestionPage = ({ questionData, onAnswer, currentIndex, totalQuestions, coins, setCoins }) => {
  // Ensure we have the correct data structure
  if (!questionData) {
    console.error("No question data provided to QuestionPage")
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Error: Question data is missing</p>
      </div>
    )
  }

  console.log("Question data:", questionData)

  // Extract data from the question - handle both data structures
  const { question, options } = questionData
  const correctAnswer = questionData.correctAnswer || []

  const segments = question ? question.split("_____________") : []

  const [selectedWords, setSelectedWords] = useState(Array(correctAnswer.length).fill(""))
  const [usedOptions, setUsedOptions] = useState([])
  const [timeLeft, setTimeLeft] = useState(60)
  const [timeExpired, setTimeExpired] = useState(false)
  const [coinAnimation, setCoinAnimation] = useState(null)

  // Reset the state when the question changes
  useEffect(() => {
    if (!correctAnswer || !correctAnswer.length) {
      console.error("No correct answer provided for question")
      return
    }

    setSelectedWords(Array(correctAnswer.length).fill(""))
    setUsedOptions([])
    setTimeLeft(60)
    setTimeExpired(false)
    setCoinAnimation(null)
  }, [questionData, correctAnswer])

  const handleWordSelect = (word) => {
    if (timeExpired) return

    const firstEmptyIndex = selectedWords.findIndex((w) => w === "")
    if (firstEmptyIndex === -1 || usedOptions.includes(word)) return

    const updated = [...selectedWords]
    updated[firstEmptyIndex] = word
    setSelectedWords(updated)
    setUsedOptions([...usedOptions, word])
  }

  const handleUnselect = (index) => {
    if (timeExpired) return

    const word = selectedWords[index]
    if (!word) return

    const updated = [...selectedWords]
    updated[index] = ""
    setSelectedWords(updated)
    setUsedOptions(usedOptions.filter((w) => w !== word))
  }

  const handleTimeout = () => {
    setTimeExpired(true)
    setTimeout(() => {
      handleSkip()
    }, 1000)
  }

  const handleSubmit = () => {
    // Check if answer is correct or not
    const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(correctAnswer)

    // Update coins based on answer eithr correct or wrong
    if (isCorrect) {
      // +10 coins for correct answer
      setCoins((prev) => prev + 10)
      setCoinAnimation({ value: "+10", type: "correct" })
    } else {
      // penalty of -5 coins for wrong answer
      setCoins((prev) => Math.max(0, prev - 5)) // Prevent negative coins
      setCoinAnimation({ value: "-5", type: "wrong" })
    }

    // Wait for animation to show before proceeding
    setTimeout(() => {
      onAnswer({
        userAnswer: selectedWords,
        answer: correctAnswer,
        isCorrect,
      })
    }, 1000)
  }

  const handleSkip = () => {
    // 0 coins for skipped question
    setCoinAnimation({ value: "0", type: "skip" })

    // Wait for animation to show before proceeding
    setTimeout(() => {
      onAnswer({
        userAnswer: Array(correctAnswer.length).fill(""),
        answer: correctAnswer,
        isCorrect: false,
        skipped: true,
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">
        {/* Header with timer and quit button */}
        <div className="flex justify-between items-center mb-6">
          <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onTimeout={handleTimeout} />

          <div className="flex items-center gap-3">
            {/* Coins display */}
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full relative">
              <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
              <span className="text-gray-700 font-medium">{coins}</span>

              {/* Coin animation */}
              {coinAnimation && (
                <span
                  className={`absolute -top-8 left-1/2 -translate-x-1/2 font-bold text-sm animate-bounce ${
                    coinAnimation.type === "correct"
                      ? "text-green-500"
                      : coinAnimation.type === "wrong"
                        ? "text-red-500"
                        : "text-gray-500"
                  }`}
                >
                  {coinAnimation.value}
                </span>
              )}
            </div>

            <button
              onClick={() => window.location.reload()}
              className="px-4 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Quit
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1 mb-10">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full flex-1 ${i <= currentIndex ? "bg-orange-400" : "bg-gray-200"}`}
            ></div>
          ))}
        </div>

        {/* Instruction */}
        <h2 className="text-center text-gray-600 font-medium mb-10">Select the missing words in the correct order</h2>

        {/* Question */}
        <div className="text-lg mb-12 text-center leading-loose">
          {segments.map((segment, index) => (
            <React.Fragment key={index}>
              {segment}
              {index < correctAnswer.length && (
                <span
                  onClick={() => handleUnselect(index)}
                  className={`inline-block min-w-[120px] mx-1 border-b-2 border-gray-300 cursor-pointer px-3 py-1 text-center ${
                    selectedWords[index] ? "font-medium text-gray-800" : "text-gray-400"
                  }`}
                >
                  {selectedWords[index] || "_______"}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Word options */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {options &&
            options.map((word, i) => (
              <button
                key={i}
                onClick={() => handleWordSelect(word)}
                disabled={usedOptions.includes(word) || timeExpired}
                className={`px-4 py-2 border rounded-lg transition-all ${
                  usedOptions.includes(word)
                    ? "bg-gray-100 text-gray-400 border-gray-200"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {word}
              </button>
            ))}
        </div>

        {/* Action buttons */}
        <div className="flex justify-between">
          {/* Skip button */}
          <button
            onClick={handleSkip}
            disabled={timeExpired}
            className="flex items-center gap-1 px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SkipForward className="w-4 h-4" />
            <span>Skip</span>
          </button>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={selectedWords.includes("") || timeExpired}
            className="w-12 h-12 flex items-center justify-center rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ArrowRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {timeExpired && (
          <div className="mt-4 text-center text-red-500 font-medium animate-pulse">
            Time's up! Moving to the next question...
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionPage
