import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, query, orderByChild, limitToLast } from "firebase/database";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "YOUR_DATABASE_URL",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// Initialize Analytics if supported in the environment
import { getAnalytics, isSupported } from "firebase/analytics";
isSupported().then(yes => yes ? getAnalytics(app) : null);

export const updateLeaderboard = (userId, name, score) => {
    const leaderboardRef = ref(db, 'leaderboard/' + userId);
    set(leaderboardRef, {
        name,
        score,
        timestamp: Date.now()
    });
};

export const getTopScores = (callback, errorCallback) => {
    const leaderboardRef = ref(db, 'leaderboard');
    const topScoresQuery = query(leaderboardRef, orderByChild('score'), limitToLast(10));
    
    const unsubscribe = onValue(topScoresQuery, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const scoresList = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })).sort((a, b) => b.score - a.score);
            callback(scoresList);
        } else {
            callback([]);
        }
    }, (error) => {
        console.error("Firebase fetch error:", error);
        if (errorCallback) errorCallback(error.message);
    });

    return unsubscribe;
};


export default db;
