var express = require("express");
const { Article } = require("../Models/article.model");
const {
  createArticle,
  getPosts,
} = require("../Controllers/article.controller");
var articleRouter = express.Router();

articleRouter.post("/createArticle", createArticle);
articleRouter.get("/getPosts", getPosts);

module.exports = { articleRouter };
