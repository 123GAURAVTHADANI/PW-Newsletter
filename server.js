var express = require("express");
var app = express();
var dotenv = require("dotenv");
const { dbConfig } = require("./Configurations/db.config");
const { User } = require("./Models/user.model");
const { Article } = require("./Models/article.model");
const { userRouter } = require("./Routers/user.router");
dotenv.config();

app.use(express.json());
let PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRouter);

/**
 * * This method is listening to a port 5001 or 3000
 *
 */
app.listen(PORT, () => {
  dbConfig();
  console.log(`Listening to the port ${PORT}`);
});
