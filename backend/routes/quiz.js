const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const User = require('../models/User');

// GET /api/questions?topic=ai
router.get('/questions', async (req, res) => {
    try {
        const { topic } = req.query;
        if (!topic) {
            return res.status(400).json({ message: 'Topic is required' });
        }
        
        const questions = await Question.find({ topic: topic.toLowerCase() });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/submit
router.post('/submit', async (req, res) => {
    try {
        const { name, email, topic, answers } = req.body;
        
        if (!name || !email || !topic || !answers) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const questions = await Question.find({ topic: topic.toLowerCase() });
        
        let score = 0;
        const resultDetails = questions.map((q, index) => {
            const isCorrect = q.answer === answers[index];
            if (isCorrect) score += 10; // 10 points per correct answer
            return {
                question: q.question,
                correctAnswer: q.options[q.answer],
                userAnswer: q.options[answers[index]],
                isCorrect
            };
        });

        // Update or create user score in MongoDB
        let user = await User.findOne({ email: email.toLowerCase() });
        if (user) {
            user.score += score;
            user.quizzesPlayed += 1;
            await user.save();
        } else {
            user = new User({
                name,
                email: email.toLowerCase(),
                score,
                quizzesPlayed: 1
            });
            await user.save();
        }

        res.json({
            score,
            totalQuestions: questions.length,
            results: resultDetails,
            user: {
                name: user.name,
                totalScore: user.score
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
