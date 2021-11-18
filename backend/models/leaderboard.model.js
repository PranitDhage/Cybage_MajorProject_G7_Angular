const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    // change quizname to name
    name: {
      type: String,
      required: true,
    },

    //add genre: String:'Brain Teasers', 'Logical Thinking', 'General Knowledge', 'Tetris', 'Bounce']
    //refer category enum in quiz model
    category: {
      type: String,
      required: [true, 'Please select the category'],
      enum: {
          values: ['Brain Teasers', 'Logical Thinking', 'General Knowledge', 'Games'],
          message: 'Please select correct category'
      }
  },

    score: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "Leaderboard",
  }
);

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
