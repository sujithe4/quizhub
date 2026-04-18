# 🧠 AI-Powered Quiz Hub

A full-stack, real-time quiz application designed for tech enthusiasts. Test your knowledge in AI, Data Science, and OS, and see how you rank against others on the global leaderboard.

## ✨ Features

- **Topic-wise Quizzes**: Specialized questions for AI, Data Science, and Operating Systems.
- **Real-time Leaderboard**: Powered by Firebase Realtime Database for instant ranking updates.
- **Premium UI**: Modern dark theme with glassmorphism and smooth animations.
- **Game Mechanics**: 15-second timer per question, progress tracking, and score calculation.
- **Review System**: Detailed feedback on correct/incorrect answers after completion.
- **Celebration**: Smooth confetti animations for successful quiz completions.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), React Router, Axios, Firebase, Canvas-Confetti.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Dotenv, Cors.
- **Styling**: Vanilla CSS (Custom Utility-first Premium Design).

## 📁 Project Structure

```text
quiz-hub/
│
├── backend/                # Node.js + Express API
│   ├── models/             # Mongoose Schemas
│   ├── routes/             # API Endpoints
│   ├── server.js           # Server Entry Point
│   └── seed.js             # Initial Data Seeding
│
├── frontend/               # React + Vite Application
│   ├── src/
│   │   ├── components/     # Reusable UI
│   │   ├── pages/          # Page Components
│   │   ├── services/       # API & Firebase Logic
│   │   └── index.css       # Core Styling
│   └── .env.example        # Environment Template
│
└── README.md
```

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or on Atlas)
- Firebase Project (Realtime Database enabled)

### 2. Backend Setup
```bash
cd backend
npm install
# Create .env from .env.example and add your MONGODB_URI
node seed.js  # Seed initial questions
npm run dev   # Start the server (if nodemon installed) or node server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Create .env from .env.example and add your Firebase & API configs
npm run dev
```

## 🔗 Firebase Configuration
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a project and enable **Realtime Database**.
3. Set rules to allow read/write (for development).
4. Copy your Web App config into the `frontend/.env` file.

## 📜 License
MIT
