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
async function uploadImg(req, res) {
  const { path } = req.file;

  let { id } = req.user;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(200).json({ Message: "Unauthorized to loggin!!" });
  }
  user.avatar = path;
  await user.save();
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
    console.log(isVerified);
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
  let { limit, page } = req.query;
  User.find()
    .sort("-createdAt")
    .limit(Number(limit))
    .skip(Number(page - 1) * Number(limit))
    .populate({ path: "article" })
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

function getUserById(req, res) {
  let { id } = req.params;
  User.findOne({ _id: id })
    .then((response) => {
      res.status(200).json({
        Message: "User is fetched!! Successfully!",
        response: response,
      });
    })
    .catch((error) => {
      res.status(500).json({ Message: "Something went wrong", error: error });
    });
}
async function getPostByUserId(req, res) {
  let { id } = req.params;
  User.findOne({ _id: id })
    .populate({ path: "article" })
    .select("article")
    .then((response) => {
      res.status(200).json({
        Message: "User Post is fetched Successfully!",
        response: response,
      });
    })
    .catch((error) => {
      res.status(500).json({ Message: "Something went wrong", error: error });
    });
}
async function subscribeUser(req, res) {
  try {
    const updateUser = await User.findByIdAndUpdate(req.user.id, {
      isSubscribed: true,
    });
    if (!updateUser) {
      return res.status(404).json({ Message: "Page not found!" });
    }
    res.status(200).json({ Message: "User is Subscribed" });
  } catch (err) {
    res.status(500).json({ Message: "Something went wrong", error: error });
  }
}
module.exports = {
  createUser,
  loginUser,
  getUsers,
  deleteUsers,
  getUserById,
  subscribeUser,
  getPostByUserId,
  uploadImg,
};
