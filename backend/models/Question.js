const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
        lowercase: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true,
        validate: [v => v.length === 4, 'Question must have exactly 4 options']
    },
    answer: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
