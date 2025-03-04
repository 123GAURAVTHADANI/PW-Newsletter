var jwt = require("jsonwebtoken");
async function isLoggedIn(req, res, next) {
  try {
    let { newlettertoken } = req.cookies;
    if (!newlettertoken) {
      res.status(401).json({
        Message: "Kindly Login!!",
      });
      return;
    }
    decoded = await jwt.verify(newlettertoken, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ Message: "Something went wrong", error: err });
  }
}

module.exports = { isLoggedIn };
