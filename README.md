# 🧠 Sentence Construction Tool

This is a **React + Vite** based web application that presents users with incomplete sentences and a set of word options to complete them. It includes a timer, scoring system, and a final result/feedback screen.

---

## 📌 Features

- Fill-in-the-blank sentences with interactive word selection.
- 4 word options per question.
- Click to deselect an answer from the sentence.
- **60-second timer** for each question.
- Auto navigation to the next question when timer runs out.
- “Next” button is disabled until all blanks are filled.
- Feedback screen at the end showing:
  - Correct vs Incorrect answers.
  - The correct answer for any incorrect response.
  - Final score out of 100.
- Fully responsive design.
- Clean and minimal UI using **Tailwind CSS**.

---

## ⚙️ Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSON Server](https://github.com/typicode/json-server)
- [React Router](https://reactrouter.com/)

## 🚀 Deployment

The app is deployed on Vercel:

🔗 [https://sentence-constructor.vercel.app](https://sentence-constructor.vercel.app)

> ⚠️ Note: The JSON Server runs locally. To see the complete functionality (including quiz questions), please run the API with `json-server`.
