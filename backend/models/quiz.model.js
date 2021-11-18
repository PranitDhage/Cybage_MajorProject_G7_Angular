const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter quiz name'],
        trim: true,
        maxlength: [100, 'Quiz name cannot exceed 100 characters']
    },
    category: {
        type: String,
        required: [true, 'Please select the category of quiz'],
        enum: {
            values: ['Brain Teasers', 'Logical Thinking', 'General Knowledge'],
            message: 'Please select correct category from quizzes'
        }
    },
    totalScore: {
        type: Number,
        required: [true, 'Please enter quiz\'s totalScore'],
        maxlength: [4, 'quiz total score cannot excced 4 characters'],
        default: 0
    },
    description:{
        type: String,
        required: true
    },
    questions: [{
        question: {
            type: String,
            trim: true,
            maxlength: [250, 'Quiz name cannot exceed 100 characters']
        },
        options: [{
            type: String,
            trim: true
        }],
        answer: {
            type: String,
            trim: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: "Quiz"
})

module.exports = mongoose.model('Quiz', quizSchema);