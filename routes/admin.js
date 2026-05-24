const express = require("express");
const router  = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");

// ─── Products CRUD ─────────────────────────────────────────────────────────────

router.get("/products", async (req, res) => {
  try {
    const db       = mongoose.connection.db;
    const products = await db.collection("products").find({}).toArray();
    res.json(products);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/products/:id", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const p  = await db.collection("products").findOne({
      _id: new mongoose.Types.ObjectId(req.params.id)
    });
    if (!p) return res.status(404).json({ error: "Олдсонгүй" });
    res.json(p);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/products", async (req, res) => {
  try {
    const db     = mongoose.connection.db;
    const result = await db.collection("products").insertOne(req.body);
    res.status(201).json({ id: result.insertedId });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put("/products/:id", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const { _id, ...update } = req.body;
    await db.collection("products").updateOne(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { $set: update }
    );
    res.json({ message: "Шинэчлэгдлээ" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    await db.collection("products").deleteOne({
      _id: new mongoose.Types.ObjectId(req.params.id)
    });
    res.json({ message: "Устгагдлаа" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── Users ─────────────────────────────────────────────────────────────────────

router.get("/users", async (req, res) => {
  try {
    const db    = mongoose.connection.db;
    const users = await db.collection("users").find({}).toArray();
    res.json(users);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── Orders ────────────────────────────────────────────────────────────────────

// Бүх захиалга
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Захиалгын статус өөрчлөх
router.put("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Захиалга олдсонгүй" });
    res.json(order);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Захиалга устгах
router.delete("/orders/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Устгагдлаа" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;