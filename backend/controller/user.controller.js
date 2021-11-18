const User = require("../models/user.model");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

//Signup a user  => /api/v1/signup
exports.signupUser = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await User.create({
    username,
    email,
    password,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

//Login User  => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  //Finding user in database
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  //check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

//logout user  => /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

//Get currently logged in user in details  => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("favouriteQuizzes");

  res.status(200).json({
    success: true,
    user,
  });
});

//get all users  => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({
    role: "user",
  });

  res.status(200).json({
    success: true,
    users,
  });
});

//get specific user details   =>  /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

/*------------------------------------------------------------------ */
// favourite api controller

//add favourite => /api/v1/addFav/:id
exports.addFavourite = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: {
        favouriteQuizzes: req.body.id,
      },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    user,
  });
});

// /remove favourite => /api/v1/addFav/:id
exports.removeFavourite = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: {
        favouriteQuizzes: req.body.id,
      },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    user,
  });
});
