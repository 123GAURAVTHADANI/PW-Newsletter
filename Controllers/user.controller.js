var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { User } = require("../Models/user.model");

function createUser(req, res) {
  User.create(req.body)
    .then((response) => {
      res
        .status(201)
        .json({ Message: "User is created Successfully!", response: response });
    })
    .catch((error) => {
      res.status(500).json({ Message: "Something went wrong!", error: error });
    });
}
async function loginUser(req, res) {
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
      res.cookie("newlettertoken", token);
      res.status(200).json({ Message: "User is loggedIn Successfully!!" });
    }
  } catch (err) {
    res.status(500).json({ Message: "Something went wrong", error: err });
  }
}

function getUsers(req, res) {
  console.log(">>", req.user);
  User.find()
    .then((response) => {
      res.status(200).json({
        Message: "User is Successfully fetched!",
        response: response,
      });
    })
    .catch((error) => {
      res.status(500).json({ Message: "Something went wrong", error: error });
    });
}
function deleteUsers(req, res) {
  User.deleteMany()
    .then((response) => {
      res.status(200).json({
        Message: "Users are Successfully successfully!",
        response: response,
      });
    })
    .catch((error) => {
      res.status(500).json({ Message: "Something went wrong", error: error });
    });
}
module.exports = { createUser, loginUser, getUsers, deleteUsers };
