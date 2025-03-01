var express = require("express");
const { User } = require("../Models/user.model");

var jwt = require("jsonwebtoken");
var userRouter = express.Router();

userRouter.post("/createUser", (req, res) => {
  User.create(req.body)
    .then((response) => {
      res
        .status(201)
        .json({ Message: "User is created Successfully!", response: response });
    })
    .catch((error) => {
      res.status(500).json({ Message: "Something went wrong!", error: error });
    });
});

userRouter.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({ Message: "Unauthorized User!" });
      return;
    }
    let userPassword = user.password;
    let isVerified = await bcrypt.compare(password, userPassword);
    if (!isVerified) {
      res.status(401).json({ Message: "Unauthorized User!" });
      return;
    }
    let token = await jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET_KEY
    );
    if (token) {
      res
        .status(200)
        .json({ Message: "User is loggedIn Successfully!!", token: token });
    }
  } catch (err) {
    res.status(500).json({ Message: "SOmething went wrong", error: err });
  }
});

module.exports = { userRouter };
