const mongoose = require("mongoose");
const localUrl = "mongodb://localhost:27017";
const mongodbUrl =
  "mongodb+srv://crudoperation:Abhishek@cluster0.16gmv.mongodb.net/HELLO_TEST?retryWrites=true&w=majority";

const uri = localUrl;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
