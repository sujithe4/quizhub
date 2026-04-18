const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');

dotenv.config();

const questions = [
    // AI Questions
    {
        topic: 'ai',
        question: 'What does "AI" stand for?',
        options: ['Artificially Intelligent', 'Artificial Intelligence', 'Automated Interface', 'Advanced Integration'],
        answer: 1,
        difficulty: 'easy'
    },
    {
        topic: 'ai',
        question: 'Which of the following is a subset of AI that focuses on teaching computers to learn from data?',
        options: ['Deep Learning', 'Machine Learning', 'Neural Networks', 'Natural Language Processing'],
        answer: 1,
        difficulty: 'medium'
    },
    {
        topic: 'ai',
        question: 'Who is often referred to as the "Father of Artificial Intelligence"?',
        options: ['Alan Turing', 'John McCarthy', 'Geoffrey Hinton', 'Andrew Ng'],
        answer: 1,
        difficulty: 'medium'
    },
    {
        topic: 'ai',
        question: 'What is the term for an AI system that can perform any intellectual task that a human can do?',
        options: ['Artificial Narrow Intelligence', 'Artificial General Intelligence', 'Artificial Super Intelligence', 'Machine Intelligence'],
        answer: 1,
        difficulty: 'hard'
    },
    {
        topic: 'ai',
        question: 'Which algorithm is primarily used for training deep neural networks?',
        options: ['K-Means Clustering', 'Decision Trees', 'Backpropagation', 'Linear Regression'],
        answer: 2,
        difficulty: 'hard'
    },
    // Data Science Questions
    {
        topic: 'data science',
        question: 'What is the primary language used for data analysis in Data Science?',
        options: ['Java', 'Python', 'C++', 'PHP'],
        answer: 1,
        difficulty: 'easy'
    },
    {
        topic: 'data science',
        question: 'Which library is commonly used for data manipulation in Python?',
        options: ['Pandas', 'Matplotlib', 'Scikit-learn', 'NumPy'],
        answer: 0,
        difficulty: 'easy'
    },
    {
        topic: 'data science',
        question: 'What is the term for cleaning and transforming raw data into a usable format?',
        options: ['Data Mining', 'Data Wrangling', 'Data Visualization', 'Data Auditing'],
        answer: 1,
        difficulty: 'medium'
    },
    {
        topic: 'data science',
        question: 'Which type of learning uses labeled data for training?',
        options: ['Unsupervised Learning', 'Reinforcement Learning', 'Supervised Learning', 'Semi-supervised Learning'],
        answer: 2,
        difficulty: 'medium'
    },
    {
        topic: 'data science',
        question: 'Which coefficient measures the strength and direction of the linear relationship between two variables?',
        options: ['Standard Deviation', 'Variance', 'Correlation Coefficient', 'P-Value'],
        answer: 2,
        difficulty: 'medium'
    },
    // OS Questions
    {
        topic: 'os',
        question: 'What does "OS" stand for?',
        options: ['Open System', 'Operating System', 'Optical Sensor', 'Output System'],
        answer: 1,
        difficulty: 'easy'
    },
    {
        topic: 'os',
        question: 'Which part of the OS manages hardware resources?',
        options: ['Shell', 'Kernel', 'Compiler', 'Interpreter'],
        answer: 1,
        difficulty: 'medium'
    },
    {
        topic: 'os',
        question: 'What is the state of a process that is waiting to be assigned to a processor?',
        options: ['Running', 'Waiting', 'Ready', 'Terminated'],
        answer: 2,
        difficulty: 'medium'
    },
    {
        topic: 'os',
        question: 'What is a "Deadlock" in an operating system?',
        options: ['A system crash', 'A situation where two processes wait for each other', 'A process ending abnormally', 'A memory leak'],
        answer: 1,
        difficulty: 'hard'
    },
    {
        topic: 'os',
        question: 'Which memory management scheme eliminates the need for contiguous allocation of physical memory?',
        options: ['Paging', 'Swapping', 'Fragmentation', 'Caching'],
        answer: 0,
        difficulty: 'hard'
    }
];

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quizhub';

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB for seeding...');
        await Question.deleteMany({});
        await Question.insertMany(questions);
        console.log('Database seeded successfully!');
        process.exit();
    })
    .catch((err) => {
        console.error('Seeding error:', err);
        process.exit(1);
    });
