var mongoose = require("mongoose");
const articleSchema = new mongoose.Schema(
  {
    article_title: {
      type: String,
      minLength: 10,
      required: [true, "Kindly provide the Post"],
    },
    article_description: {
      type: String,
      minLength: 10,
      maxLength: 200,
      required: [true, "Kindly Provide the Article Description"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    article_image_url: {
      type: String,
      default: "",
    },
    tags: {
      type: String,
      enum: ["lifestyle", "tech", "food"],
      required: true,
      default: "lifestyle",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
module.exports = { Article };
