const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = mongoose.model("users");
const { JWT_SECRET_KEY } = require("../keys/keys");

const router = express.Router();

router.post("/api/signin", async (req, res, next) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username: username });

  if (!existingUser) {
    return res.status(409).send({ message: "Authentication failed" });
  }

  const isMatched = await bcrypt.compare(password, existingUser.password);

  if (!isMatched) {
    return res.status(409).send({ message: "Authentication failed" });
  }

  res.status(200).send({
    message: "ath successful",
    token: jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    }),
  });
});

module.exports = router;
