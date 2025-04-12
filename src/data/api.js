import sampleData from "./sampleData"

export const fetchQuestions = async () => {
  try {
    // Try to fetch from the API first
    const response = await fetch("http://localhost:3001/data")
    const data = await response.json()

    // Check if we have the expected data structure
    if (data && data.data && data.data.questions) {
      console.log("API data loaded successfully")
      return data.data.questions
    } else if (data && data.questions) {
      console.log("API data loaded successfully (alternate structure)")
      return data.questions
    } else {
      console.warn("Unexpected API response format, using sample data")
      return sampleData.data.questions
    }
  } catch (error) {
    console.warn("Failed to fetch from API, using sample data:", error)
    // Fallback to sample data if API fails
    return sampleData.data.questions
  }
}
