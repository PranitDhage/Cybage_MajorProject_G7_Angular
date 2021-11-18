const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const validator = require("validator");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter your username'],
    maxlength: [30, 'Your name cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Your password must be longer than 6 characters'],
    select: false
  },
  role: {
    type: String,
    default: "user",
  },
  favouriteQuizzes : [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Quiz',
      unique: true
    }
],
  createdAt: {
    type: Date,
    default: Date.now
  }
},{
  collection: "User"
});

//Encrypting password before saving user
userSchema.pre('save', async function (next){
  if(!this.isModified('password')){
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
})

//compare user password
userSchema.methods.comparePassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

//Return JWT token
userSchema.methods.getJwtToken = function(){
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME * 24 * 60 * 60 * 1000
  })
}

module.exports = mongoose.model("User", userSchema);
