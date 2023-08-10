const express = require("express");
const mongoose = require("mongoose");
const Product = mongoose.model("products");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.delete("/api/products/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.userData.id;

  if (userId != product.userId) {
    return res.status(400).send({ message: "Authentication failed" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Id is not valid" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(400).send({ message: "Product not found" });
  }

  await Product.deleteOne({ _id: id });

  res.status(200).send({ message: "Product deleted" });
});

module.exports = router;
