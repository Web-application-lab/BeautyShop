const express  = require("express");
const router   = express.Router();
const Order    = require("../models/Order");
const mongoose = require("mongoose");

// Захиалга үүсгэх
router.post("/", async (req, res) => {
  try {
    const { userId, userName, userEmail, userPhone, items, totalPrice, address } = req.body;

    if (!userId || !items?.length)
      return res.status(400).json({ error: "Мэдээлэл дутуу байна" });

    const db = mongoose.connection.db;

    // Stock шалгах
    for (const item of items) {
      const product = await db.collection("products").findOne({ id: Number(item.productId) });
      if (!product) {
        return res.status(400).json({ error: `"${item.name}" бүтээгдэхүүн олдсонгүй` });
      }
      if ((product.stock ?? 0) < item.qty) {
        return res.status(400).json({
          error: `"${item.name}" — нөөц хүрэлцэхгүй байна (үлдэгдэл: ${product.stock ?? 0} ш)`
        });
      }
    }

    // Stock хасах
    for (const item of items) {
      await db.collection("products").updateOne(
        { id: Number(item.productId) },
        { $inc: { stock: -item.qty } }
      );
    }

    const order = await Order.create({
      userId, userName, userEmail, userPhone,
      items, totalPrice, address
    });

    res.status(201).json({ message: "Захиалга амжилттай!", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Хэрэглэгчийн захиалгууд
router.get("/my/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;