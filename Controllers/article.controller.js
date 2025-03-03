const { Article } = require("../Models/article.model");
const { User } = require("../Models/user.model");

async function createArticle(req, res) {
  try {
    let post = await Article.create(req.body);
    if (post) {
      let user = await User.findOne({ _id: post.user });
      user.article.push(post._id);
      await user.save();
      res.status(201).json({
        Message: "Article is created Successfully!",
        response: post,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Something went wrong!", error: error });
  }
}
function getPosts(req, res) {
  Article.find()
    .populate({ path: "comments" })
    .then((response) => {
      res.status(200).json({
        Message: "Posts are Successfully fetched!",
        response: response,
      });
    })
    .catch((error) => {
      res.status(500).json({ Message: "Something went wrong", error: error });
    });
}

module.exports = { createArticle, getPosts };
