const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemSchema = new mongoose.Schema({
  title: String,
  price: Number,
  quantity: Number
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  totalPrice: Number,
  userId: mongoose.Types.ObjectId
});


mongoose.model("orders", orderSchema);