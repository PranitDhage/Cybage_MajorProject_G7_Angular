const Quiz = require('../models/quiz.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

//Create new quiz => /api/v1/admin/quiz
exports.createQuiz = catchAsyncErrors(async (req, res, next) => {
    const quiz = await Quiz.create(req.body);

    res.status(201).json({
        success: true,
        quiz
    })
})


//Get all quizzes  => /api/v1/quizzes
exports.getAllQuizzes = catchAsyncErrors(async (req, res, next) => {

    const quizzes = await Quiz.find();

    res.status(200).json({
        success: true,
        quizzes
    })
})

//Get single quiz => /api/v1/quiz/:id
exports.getSingleQuiz = catchAsyncErrors(async (req, res, next) => {

    const quiz = await Quiz.findById(req.params.id)

    if (!quiz) {
        return next(new ErrorHandler('Quiz not Found', 404));
    }

    res.status(200).json({
        success: true,
        quiz
    })
})

//update quiz => /api/v1/admin/quiz/:id
exports.updateQuiz = catchAsyncErrors(async (req, res, next) => {
    let quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        return next(new ErrorHandler('Quiz not found', 404));
    }

    quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        quiz
    })
})

//Delete Quiz => /api/v1/admin/quiz/:id
exports.deleteQuiz = catchAsyncErrors(async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        return next(new ErrorHandler('Quiz not found', 404));
    }

    await quiz.remove();

    res.status(200).json({
        success: true,
        message: 'Quiz is deleted'
    })
})