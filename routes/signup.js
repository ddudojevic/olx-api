const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = mongoose.model("users");

const router = express.Router();

router.post("/api/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  let existingUser = await User.findOne({ username: username });

  if (existingUser) {
    return res.status(409).send({ message: "Authentication failed" });
  }

  existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(409).send({ message: "Authentication failed" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({ username, email, password: hashedPassword });

  res.status(200).send(createdUser);
});

module.exports = router;
