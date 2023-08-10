const express = require("express");
const mongoose = require("mongoose");
const checkAuth = require("../middlewares/check-auth");
const User = mongoose.model("users");
const Order = mongoose.model("orders");
const Product = mongoose.model("products");

const router = express.Router();

router.post("/api/order", checkAuth, async (req, res) => {
  const userId = req.userData.id;

  const { items } = req.body;
  const orderItems = [];
  let totalPrice = 0;

  if (!items || items.length === 0) {
    return res.status(409).send({ message: "Can't have empty order!" });
  }

  for (const item of items) {
    if (!item.itemId || !item.quantity) {
      return res
        .status(404)
        .send({ message: "Can't have empty itemId or quantity" });
    }



    const product = await Product.findById(item.itemId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if(product.userId==userId){
        return res.status(409).send({ message: "You can not buy your product" });
    }

    if (product.quantity < item.quantity || product.isAvailable === false) {
      return res.status(409).send({ message: "Not enough in stock" });
    }

    
    if (product.quantity-item.quantity===0) {
        const updatedProduct = await Product.findByIdAndUpdate(
            item.itemId,
            { $inc: { quantity: -item.quantity }, isAvailable: false },
            { new: true },
            
          );
        
    } else {
        const updatedProduct = await Product.findByIdAndUpdate(
            item.itemId,
            { $inc: { quantity: -item.quantity } },
            { new: true }
          );
        
    }
    

    const price = product.price * item.quantity;
    totalPrice = totalPrice + price;
    const orderItem = {
      title: product.title,
      price,
      quantity: item.quantity,
    };
    orderItems.push(orderItem);
  }

  const order = new Order({
    items: orderItems,
    totalPrice,
    userId,
  });

  await order.save();

  res.status(201).send({ message: "Order created successfully", order });
});

module.exports = router;
