# 🧠 Sentence Construction Tool

This is a **React + Vite** based web application that presents users with incomplete sentences and a set of word options to complete them. It includes a timer, scoring system, and a final result/feedback screen.

---

## 📌 Features

- Fill-in-the-blank sentences with interactive word selection.
- 4 word options per question.
- Click to deselect an answer from the sentence.
- **30-second timer** for each question.
- Auto navigation to the next question when timer runs out.
- “Next” button is disabled until all blanks are filled.
- Feedback screen at the end showing:
  - Correct vs Incorrect answers.
  - The correct answer for any incorrect response.
  - Final score out of 10.
- Fully responsive design.
- Clean and minimal UI using **Tailwind CSS**.

---

## ⚙️ Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/) *(optional)*
- [Tailwind CSS](https://tailwindcss.com/)
- [JSON Server](https://github.com/typicode/json-server)
- [React Router](https://reactrouter.com/)

## 📁 Project Structure
sentence-construction-tool/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── SentenceCard.tsx
│   │   ├── OptionButton.tsx
│   │   ├── Timer.tsx
│   │   └── Navbar.tsx
│   ├── pages/
│   │   ├── QuizPage.tsx
│   │   └── ResultPage.tsx
│   ├── hooks/
│   │   └── useTimer.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── shuffleArray.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── db.json                  # JSON Server data
├── tailwind.config.cjs      # Tailwind CSS config
├── postcss.config.cjs       # PostCSS config
├── vite.config.ts           # Vite config
├── tsconfig.json            # TypeScript config
├── .gitignore
├── package.json
└── README.md

