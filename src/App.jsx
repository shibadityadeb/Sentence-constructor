"use client"

import { useState, useEffect } from "react"
import LandingPage from "./components/LandingPage"
import QuestionPage from "./components/QuestionPage"
import ReviewPage from "./components/ReviewPage"
import { fetchQuestions } from "./data/api"

function App() {
  const [step, setStep] = useState("landing")
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [coins, setCoins] = useState(0)

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions()
        console.log("Questions loaded:", data)
        setQuestions(data)
      } catch (error) {
        console.error("Failed to fetch questions:", error)
        setError("Failed to load questions. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [])

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setStep("review")
    }
  }

  const startQuiz = () => {
    if (questions && questions.length > 0) {
      setStep("quiz")
    } else {
      setError("No questions available. Please try again later.")
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-primary-600">Loading questions...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <div className="text-2xl font-semibold text-red-600 mb-4">{error}</div>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Reload
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {step === "landing" && <LandingPage onStart={startQuiz} />}

      {step === "quiz" && questions.length > 0 && (
        <QuestionPage
          questionData={questions[currentQuestionIndex]}
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          coins={coins}
          setCoins={setCoins}
        />
      )}

      {step === "review" && <ReviewPage answers={answers} questions={questions} coins={coins} />}
    </div>
  )
}

export default App
