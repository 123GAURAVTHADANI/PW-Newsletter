var express = require("express");
const { User } = require("../Models/user.model");

const { isLoggedIn } = require("../Middlewares/login.middleware");
const { authorizeRole } = require("../Middlewares/role.middleware");
const {
  createUser,
  getUsers,
  loginUser,
  deleteUsers,
} = require("../Controllers/user.controller");
var userRouter = express.Router();

userRouter.post("/createUser", createUser);

userRouter.post("/login", loginUser);

userRouter.get(
  "/getUsers",
  isLoggedIn,
  authorizeRole("ADMIN", "USER", "QA-Tester"),
  getUsers
);

userRouter.delete(
  "/deleteUsers",
  isLoggedIn,
  authorizeRole("ADMIN"),
  deleteUsers
);

module.exports = { userRouter };
