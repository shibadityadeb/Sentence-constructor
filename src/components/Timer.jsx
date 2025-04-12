"use client"

import { useEffect } from "react"

const Timer = ({ timeLeft, setTimeLeft, onTimeout }) => {
  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout()
      return
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, setTimeLeft, onTimeout])

  // Format time as minutes:seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  return <div className="text-2xl font-medium text-gray-800">{formatTime(timeLeft)}</div>
}

export default Timer
