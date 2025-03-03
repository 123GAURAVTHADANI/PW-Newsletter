const express = require("express");
const { createComment } = require("../Controllers/comments.controller");
const commentRouter = express.Router();

commentRouter.post("/createComments", createComment);

module.exports = { commentRouter };
