const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2, // Adjusted length constraints for realistic names
      maxLength: 30,
    },
    last_name: {
      type: String,
      minLength: 2, // Adjusted length constraints for realistic names
      maxLength: 30,
    },
    age: { type: Number },
    email: { type: String, required: true, unique: true, trim: true },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    password: { type: String, required: true, minLength: 8 },
    // isAdmin: { type: Boolean },
    phone: { type: String, unique: true },
    address: { type: String },
    state: { type: String },
    country: { type: String },
    zip: { type: String },
    city: { type: String },
    hobbies: [String], // Array of strings for hobbies
    // profilePic: { type: String, default: "default.jpg" },
    about: {
      type: String,
      default: "This is my default message for every user",
    },
  },
  {
    timestamps: true, // Moved this to the schema options
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "Abhishek@devtinder");
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};
module.exports = mongoose.model("User", userSchema);
