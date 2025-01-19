const express = require("express");
const connectDB = require("./src/config/database");
const User = require("./src/models/user");
const validate = require("./src/utils/signupValidation");
const bcrypt = require("bcrypt");

const app = express();
const port = 4000;
app.use(express.json());

// const main = async () => {
//   // try {
//   //   const existingData = await User.find({});
//   //   if (existingData.length === 0) {
//   //     const data = [
//   //       { name: "A", age: 25, email: "abhishek@gmail.com" },
//   //       { name: "John123", age: 30, email: "john@gmail.com" },
//   //     ];
//   //     const insertResult = await User.insertMany(data);
//   //     console.log("Inserted documents:", insertResult);
//   //   } else {
//   //     console.log("Data already exists.");
//   //   }

//   const findResult = await User.find({});
//   console.log("Found documents:", findResult);
//   //   } catch (error) {
//   //     console.error("Error performing database operations:", error.message);
//   //   }
// };

app.get("/users", async (req, res) => {
  console.log(req.body.id);
  const users = await User.find({});
  res.json(users);
});
app.get("/users", async (req, res) => {
  const emailId = req.body.email; // Use req.query for GET requests
  try {
    console.log(emailId);

    const user = await User.findOne({ email: emailId });
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/signup", async (req, res) => {
  validate(req);
  console.log(req.body);
  const { first_name, last_name, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 2);
  console.log(hashPassword);

  const user = new User({
    first_name,
    last_name,
    email,
    password: hashPassword,
  });
  user
    .save()
    .then((result) => res.json(result))
    .catch((err) => {
      console.log("Error: " + err);
    });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");
    console.log(user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return res.status(200).send("Logged in successfully");
    } else {
      return res.status(400).send("Invalid password");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.patch("/users/:id", (req, res) => {
  console.log(req.body.id);
  User.findByIdAndUpdate(req.body.id, req.body, { new: true })
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json("Error: " + err));
});
app.patch("/users", async (req, res) => {
  console.log(req.body);

  const emailId = req.body.email; // Email to identify the user
  const updates = req.body.updates; // Fields to update, passed in the request body

  // if (!emailId || !updates) {
  //   return res.status(400).send("Email and updates are required");
  // }

  try {
    console.log("Updating user with email:", emailId);
    console.log("Updates:", updates);

    // Find user by email and update with provided fields
    const user = await User.findOneAndUpdate(
      { email: emailId }, // Filter
      { $set: updates }, // Update data
      { new: true, runValidators: true } // Return updated user and validate inputs
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/users/:id", (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json("User not found"));
});

app.delete("/weed/:id", (req, res) => {
  console.log(req.params.id);
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(404).json("User not found"));
});

connectDB()
  .then(() => {
    // main();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("error: ", err);
  });
