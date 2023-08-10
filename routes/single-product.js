const express = require("express");
const mongoose = require("mongoose");
const Product = mongoose.model("products");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.get("/api/products/:id", checkAuth, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Id is not valid" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(400).send({ message: "Product not found" });
  }

  res.status(200).send(product);
});

module.exports = router;
