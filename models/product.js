const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String,
  imgUrl: String,
  price: Number,
  quantity: Number,
  isAvailable: Boolean,
  userId: mongoose.Types.ObjectId,
});

mongoose.model("products", productSchema);
