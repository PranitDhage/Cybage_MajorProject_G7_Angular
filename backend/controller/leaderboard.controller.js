const Leaderboard = require("../models/leaderboard.model");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendEmail = require('../utils/sendEmail');
const ErrorHandler = require('../utils/errorHandler');

// ---------------------------------------
//                  GET
// ---------------------------------------
// All top scorers for admin => /api/v1/top-scorer
exports.getTopScorer = catchAsyncErrors(async (req, res, next) => {
  const topScorer = await Leaderboard.aggregate([
    {
      $sort: { score: -1 },
    },
    {
      $group: {
        _id: { name: "$name" },
        username: { $first: "$username" },
        category: { $first: "$category" },
        topScore: { $max: "$score" },
      },
    },
  ]);
  res.status(200).json({
    success: true,
    topScorer,
  });
});

//Add new score to leaderboard =>/api/v1/add-score
exports.addNewScore = catchAsyncErrors(async (req, res, next) => {
  const { username, name, category, score } = req.body;

  const leaderboard = new Leaderboard({
    username,
    name,
    category,
    score,
  });

  const message = `Hello, ${username}\n\nYour score in ${name} of category ${category} is ${score}`

  try{
    // await sendEmail({
    //   email: 'Trng1@evolvingsols.com',
    //   subject: 'Bestify your Time CORE-7 score',
    //   message
    // })
  }catch(error){
    console.log("Email send failed");
    return next(new ErrorHandler(error.message, 500));
  }

  const ldrbrd = await leaderboard.save();
  res.status(200).json({
    success: true,
    ldrbrd,
  });
});
