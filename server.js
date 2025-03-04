var express = require("express");
var app = express();
var dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { dbConfig } = require("./Configurations/db.config");
const { User } = require("./Models/user.model");
const { Article } = require("./Models/article.model");
const { userRouter } = require("./Routers/user.router");
const { articleRouter } = require("./Routers/article.router");
const { commentRouter } = require("./Routers/comment.router");
const { cloudinaryConfig } = require("./Configurations/cloudinary.config");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
let PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/article", articleRouter);
app.use("/api/v1/comment", commentRouter);
// app.use("/api/v1/likes", likeRouter);
/**
 * * This method is listening to a port 5001 or 3000
 *
 */
app.listen(PORT, () => {
  dbConfig();
  cloudinaryConfig();
  console.log(`Listening to the port ${PORT}`);
});
