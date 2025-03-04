var express = require("express");
const { User } = require("../Models/user.model");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { isLoggedIn } = require("../Middlewares/login.middleware");
const { authorizeRole } = require("../Middlewares/role.middleware");
const {
  createUser,
  getUsers,
  loginUser,
  deleteUsers,
  getUserById,
  subscribeUser,
  getPostByUserId,
  uploadImg,
} = require("../Controllers/user.controller");
var userRouter = express.Router();

userRouter.post("/createUser", createUser);
userRouter.post(
  "/uploadAvatar",
  isLoggedIn,
  upload.single("avatar"),
  uploadImg
);
userRouter.post("/login", loginUser);
userRouter.get("/getUsers", getUsers);
userRouter.get("/getUser/:id", isLoggedIn, getUserById);
userRouter.patch("/subscribeUser", isLoggedIn, subscribeUser);
userRouter.get("/getPostsByUserId/:id", isLoggedIn, getPostByUserId);

userRouter.delete(
  "/deleteUsers",
  isLoggedIn,
  authorizeRole("ADMIN"),
  deleteUsers
);

module.exports = { userRouter };
