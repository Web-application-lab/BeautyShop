const express = require("express");
const router  = express.Router();
const Review  = require("../models/Review");

// Бүтээгдэхүүний сэтгэгдлүүд
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: Number(req.params.productId) })
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Сэтгэгдэл нэмэх
router.post("/", async (req, res) => {
  try {
    const { productId, userId, userName, rating, comment } = req.body;

    if (!productId || !userId || !rating || !comment)
      return res.status(400).json({ error: "Мэдээлэл дутуу байна" });

    // Нэг хэрэглэгч нэг бүтээгдэхүүнд нэг удаа сэтгэгдэл үлдээнэ
    const existing = await Review.findOne({ productId: Number(productId), userId });
    if (existing)
      return res.status(400).json({ error: "Та аль хэдийн сэтгэгдэл үлдээсэн байна" });

    const review = await Review.create({ productId: Number(productId), userId, userName, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;