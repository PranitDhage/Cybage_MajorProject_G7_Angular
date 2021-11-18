const express = require('express');
const router = express.Router();

const {
    createQuiz,
    getAllQuizzes,
    getSingleQuiz,
    updateQuiz,
    deleteQuiz
} = require('../controller/quiz.controller');

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');

router.route('/admin/quiz').post(isAuthenticatedUser, authorizeRoles('admin'), createQuiz);

router.route('/quizzes').get(isAuthenticatedUser, getAllQuizzes);
router.route('/quiz/:id').get(isAuthenticatedUser, getSingleQuiz);

router.route('/admin/quiz/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateQuiz)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteQuiz);

module.exports = router;