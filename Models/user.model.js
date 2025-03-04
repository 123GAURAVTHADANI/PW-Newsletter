var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

let communicationSchema = new mongoose.Schema({
  address_1: {
    type: String,
    required: true,
  },
  address_2: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    enum: ["INDIA", "US", "AUSTRALIA"],
    default: "INDIA",
  },
  phone_number_country_code: {
    type: String,
    default: "+91",
  },
  state: {
    type: String,
    required: true,
  },
});

let userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter the First Name"],
      minLength: 3,
    },
    lastname: {
      type: String,
      required: [true, "Please enter the Second Name"],
      minLength: 3,
    },
    about: {
      type: String,
      required: [true, "Please enter the Summary of the user"],
      minLength: 10,
      maxLength: 200,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Please enter the email of the user"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Provide the valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please input the user Password"],
    },
    username: {
      type: String,
      required: [true, "Please input the username"],
      unique: true,
      minLength: 3,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER", "QA-TESTER", "CONTENT_WRITTER"],
      default: "USER",
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      required: [false, "Kindly provide the DOB!"],
    },
    phoneNumber: {
      required: [true, "Kindly Give the Phone Number"],
      type: String,
      minLength: 10,
    },
    article: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],

    communication_address: communicationSchema,
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  // new password / modified
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } else if (this.isModified("avatar")) {
    let result = await cloudinary.uploader.upload(this.avatar);
    console.log(result);
    next();
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
