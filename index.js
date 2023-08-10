const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Keys = require("./keys/keys");

const app = express();

app.use(express.json());
app.use(cors());

require("./models/user");
require("./models/product");
require("./models/order");

const signUp = require("./routes/signup");
const signIn = require("./routes/signin");
const addProduct = require("./routes/add-product");
const Products = require("./routes/products");
const singleProduct = require("./routes/single-product");
const deleteProduct = require("./routes/delete-product");
const updateProduct = require("./routes/update-product");
const userProducts = require("./routes/user-products");
const order = require("./routes/order");
const ordersHistory = require("./routes/orders-history");

app.use(signUp);
app.use(signIn);
app.use(addProduct);
app.use(Products);
app.use(order);
app.use(singleProduct);
app.use(deleteProduct);
app.use(updateProduct);
app.use(userProducts);
app.use(ordersHistory);

const start = async () => {
  try {
    await mongoose.connect(Keys.mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log("Listening on port 5000"));
};

start();
