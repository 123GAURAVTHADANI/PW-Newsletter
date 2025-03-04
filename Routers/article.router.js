var express = require("express");
const { Article } = require("../Models/article.model");
const {
  createArticle,
  getPosts,
  deletePostByPostId,
} = require("../Controllers/article.controller");
const { isLoggedIn } = require("../Middlewares/login.middleware");
var articleRouter = express.Router();

articleRouter.post("/createArticle", createArticle);
articleRouter.get("/getPosts", getPosts);
articleRouter.delete(
  "/deletePostByPostId/:postId",
  isLoggedIn,
  deletePostByPostId
);
module.exports = { articleRouter };
