const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

const cors = require("cors");
const errorMiddleware = require("./middlewares/errors");
const corsConfig = {
    origin: true,
    credentials: true
}

//dotenc require absolute pth
//configuration of dotenv file
require("dotenv").config({ path: __dirname + `/config/config.env` });

app.use(express.json());
app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Importing routes

const quizRouter = require("./routes/quiz.route");
const userRouter = require("./routes/user.route");
const leaderboardRoute = require("./routes/leaderboard.route");

//configuring route end point for quiz
app.use("/api/v1", quizRouter);
//configuring route end point for user
app.use("/api/v1", userRouter);
//configuring route end point for leaderboard
app.use("/api/v1", leaderboardRoute);

//Middleware to handle errors
app.use(errorMiddleware);
module.exports = app;
