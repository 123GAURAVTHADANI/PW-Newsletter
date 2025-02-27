var express = require("express");
var app = express();
var dotenv = require("dotenv");
const { dbConfig } = require("./Configurations/db.config");
dotenv.config();

let PORT = process.env.PORT || 3000;

/**
 * * This method is listening to a port 5001 or 3000
 *
 */
app.listen(PORT, () => {
  dbConfig();
  console.log(`Listening to the port ${PORT}`);
});
