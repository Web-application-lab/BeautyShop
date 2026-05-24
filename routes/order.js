const express = require("express");
const router  = express.Router();
const Order   = require("../models/Order");

// Захиалга үүсгэх
router.post("/", async (req, res) => {
  try {
    const { userId, userName, userEmail, userPhone, items, totalPrice, address } = req.body;

    if (!userId || !items?.length)
      return res.status(400).json({ error: "Мэдээлэл дутуу байна" });

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