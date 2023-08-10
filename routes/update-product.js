const express = require("express");
const mongoose = require("mongoose");
const Product = mongoose.model("products");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.put("/api/products/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.userData.id;
  const { title, price, imgUrl, quantity } = req.body;

  if (userId != product.userId) {
    return res.status(400).send({ message: "Authentication failed" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Id is not valid" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  

  if (!title || !price || !imgUrl || !quantity) {
    return res
      .status(409)
      .send({ message: "Can't have empty title or price!" });
  }

  product.title = title;
  product.price = price;
  product.imgUrl = imgUrl;
  product.quantity = quantity;

  const updatedProduct = await product.save();

  res.status(200).send({ updatedProduct });
});

module.exports = router;
