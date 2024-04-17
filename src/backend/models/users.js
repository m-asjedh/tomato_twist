const mongoose = require("mongoose");

// Defining a schema for the user model 
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  confirmPassword: String,
  score: Number,
  highScore: {
    type: Number,
    default: 0
  }
});

// model created using the schema named users
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
