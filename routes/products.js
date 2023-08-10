const express = require("express");
const mongoose = require("mongoose");
const Product = mongoose.model("products");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.get("/api/products", checkAuth, async (req, res) => {
  const products = await Product.find();

  if(!products || products.length === 0){
    return res.status(404).send({ message: "Product not found" });
  }

  res.status(200).send(products);
});

module.exports = router;
