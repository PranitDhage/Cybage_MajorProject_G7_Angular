const express = require("express");
const {
  addNewScore,
  getTopScorer,
} = require("../controller/leaderboard.controller");
const router = express.Router();

const { isAuthenticatedUser } = require("../middlewares/auth");

//Get top scorer for a quiz
router.route("/top-scorer").get(getTopScorer);

// isAuthenticatedUser
//Add score on submitting a quiz
router.route("/add-score").post(addNewScore);

module.exports = router;
