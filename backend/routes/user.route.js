const express = require("express");
const router = express.Router();

const {
    signupUser,
    loginUser,
    logoutUser,
    getUserProfile,
    allUsers,
    getUserDetails,
    addFavourite,
    removeFavourite
} = require('../controller/user.controller');

const {
    isAuthenticatedUser,
    authorizeRoles
} = require('../middlewares/auth');

//Signup
router.route('/signup').post(signupUser);

//Signin
router.route('/login').post(loginUser);

//logout
router.route('/logout').get(logoutUser);

// favourite quizzes functionality
// add faourite
router.route('/addFav').put(isAuthenticatedUser, addFavourite);
// remove faourite
router.route('/removeFav').put(isAuthenticatedUser, removeFavourite);

//current user profile
router.route('/me').get(isAuthenticatedUser, getUserProfile);

//get all users list   =>  ADMIN route
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);

//get specific user   => ADMIN route
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails);


/*-------------------------------------------------------- */



module.exports = router;