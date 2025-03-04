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
    .select("-comments")
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
function getPosts(req, res) {
  Article.find()
    .populate({ path: "comments" })
    .select("-comments")
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
// delete the article which the loggedin user has created !
// article Id
// loggin Id
async function deletePostByPostId(req, res) {
  try {
    let { id } = req.user;
    let { postId } = req.params;
    let user = await User.findOne({ _id: id });
    if (!user.article.includes(postId)) {
      res.status(401).json({ Message: "UnAuthorized to do it!!" });
      return;
    }
    let deletePostFromCollection = await Article.deleteOne({ _id: postId });
    if (!deletePostFromCollection) {
      res.status(404).json({ Message: "Post Id not found" });
      return;
    }

    let findPostIndex = user.article.indexOf(postId);
    if (findPostIndex !== -1) {
      user.article.splice(findPostIndex, 1);
      await user.save();
    }
    res.status(200).json({ Message: "Deleted the article successfully!!" });
  } catch (error) {
    res.status(500).json({ Message: "Soemthing went wrong!!", error: erro });
  }
}

module.exports = { createArticle, getPosts, deletePostByPostId };
