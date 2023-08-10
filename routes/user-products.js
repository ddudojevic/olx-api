const express = require("express");
const mongoose = require("mongoose");
const Product = mongoose.model("products");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.get("/api/my-products", checkAuth, async (req, res) => {
  const userId = req.userData.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ message: "Id is not valid" });
  }

  const products = await Product.find({ userId: userId });

  if (!products || products.length === 0) {
    return res.status(404).send({ message: "Product not found" });
  }

  res.status(200).send(products);
});

module.exports = router;
