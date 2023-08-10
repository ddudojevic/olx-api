const express = require("express");
const mongoose = require("mongoose");
const checkAuth = require("../middlewares/check-auth");
const router = express.Router();
const Order = mongoose.model("orders");
router.get("/api/orders", checkAuth, async (req, res) => {
  const userId = req.userData.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ message: "Id is not valid" });
  }

  const orders = await Order.find({ userId: userId });

  if (!orders || orders.length === 0) {
    return res.status(404).send({ message: "Order not found" });
  }

  res.status(200).send(orders);
});

module.exports = router;