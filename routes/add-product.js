const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Product = mongoose.model("products");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.post("/api/add-product", checkAuth, async (req, res) => {
  try {
    const {title, price, imgUrl, quantity} = req.body;

    if (!title || !price  || !imgUrl || !quantity) {
      return res
        .status(409)
        .send({ message: "Can't have empty title or price!" });
    }

    const isAvailable = true;

    const userId = req.userData.id;

    const createdProduct = await Product.create({
      title,
      price,
      imgUrl,
      quantity,
      isAvailable,
      userId,
    });

    res.status(200).send(createdProduct);
  } catch (error) {
    return res.status(401).send({ message: "Ne failed" });
  }
});

module.exports = router;
