// modules needed for seeting up the backend server
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//Intialize express appilcation
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Connection of MonogoDB Atlas
mongoose.connect(
  "mongodb+srv://fmasjedh:itz_asjedh@tomatotwist.zoexlmi.mongodb.net/?retryWrites=true&w=majority&appName=TomatoTwist"
);

//user signup
/* hash the password
create a new user object
create the user in the database*/
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      score: 0,
    };
    const createdUser = await UserModel.create(newUser);
    res.json(createdUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
});

//handle user login
/*find the user by email
check if the password matches
generate JWT token
assign the token to the user */
const jwtSecret = process.env.ACESS_TOKEN_SCERECT;
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const passwordMatch = bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ id: user._id, email }, jwtSecret, {
          expiresIn: "1h",
        });
        user.token = token;
        res.status(200).json({
          success: true,
          token,
          user,
        });
      } else {
        res.status(401).json("The password is incorrect");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

//middleware functionverify jwt token
/*get the token from headers
verify the token using secrect key
attach the decoded info into the object
proceed to the next route handler*/
const verfiyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized acess" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACESS_TOKEN_SCERECT);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: "Invalid Token" });
  }
};

//handle user's score updating
/*extract score and user id
find user by id
update the user score
update the user high score
save the updated score*/
app.post("/update-score", verfiyToken, async (req, res) => {
  try {
    const { score } = req.body;
    const userId = req.user.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    user.score = score;

    if (score > user.highScore) {
      user.highScore = score;
    }

    await user.save();

    res
      .status(200)
      .json({ succes: true, message: "score updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error while updating the score" });
  }
});

//retrieve user details from DB
/*extract user id from token
find the user by id
send user details in res*/
app.get("/profile", verfiyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("No such user exists");
    }
    res.status(200).json({
      name: user.name,
      email: user.email,
      highScore: user.highScore,
    });
  } catch (error) {
    console.error("Error fetching user profile", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//handle leaderboard creation
/*get dta for the leaderboard
only get the require fields
sorting the leaderboard in descending
send the leaderboard in res*/
app.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await UserModel.find(
      {},
      { name: 1, score: 1, highScore: 1, _id: 0 }
    ).sort({ highScore: -1 });

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error getting leaderboard data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete user account
/* Find the user by ID
 Delete the user from the database*/
app.delete("/delete-account", verfiyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await UserModel.findByIdAndDelete(userId);
    res
      .status(200)
      .json({ success: true, message: "User account deleted successfully" });
  } catch (error) {
    console.error("Error deleting user account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//nodemailer setup
/*configuring gmail 
note the gmail account */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "m.asjedhcr7@gmail.com",
    pass: "xvnu cllv ievg kenv",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//function to send an email
const sendEmail = async (userEmail, score) => {
  const mailOptions = {
    from: "m.asjedhcr7@gmail.com",
    to: userEmail,
    subject: "Tomato Twist",
    text: `Your score is ${score}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully" };
  } catch (err) {
    console.log("There was an issue sending the email", err);
    throw err;
  }
};

//handle mail sending
/*extract usermail and score
call send mail function*/
app.post("/send-email", async (req, res) => {
  const { userEmail, score } = req.body;
  try {
    await sendEmail(userEmail, score);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.log("Error sending email:", error);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
});

//handle background audio
app.use("/audio", express.static("audio"));

//server listening port 3001
app.listen(3001, () => {
  console.log("Server is running on 3001");
});
