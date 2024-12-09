const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewareauthentication/auth");

app.use(
  "/home",
  adminAuth,

  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    // res.send("user is authenticated");
    next();
  }
);

app.use("/a/", (req, res) => {
  res.send("hii this is our contact use page");
});

app.use("/admin", userAuth);
app.listen(3000, () => {
  console.log("listening on port 3000");
});
