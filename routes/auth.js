const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
// Бүртгэл
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "Бүх талбарыг бөглөнө үү" });

    if (password.length < 6)
      return res.status(400).json({ error: "Нууц үг хамгийн багадаа 6 тэмдэгт байна" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ error: "Энэ имэйл бүртгэлтэй байна" });

    // Hash хийж хадгална
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      message: "Амжилттай бүртгэгдлээ",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Нэвтрэх
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Имэйл болон нууц үгээ оруулна уу" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Имэйл эсвэл нууц үг буруу байна" });

    const match = await user.comparePassword(password);
    if (!match)
      return res.status(400).json({ error: "Имэйл эсвэл нууц үг буруу байна" });

    res.json({
      message: "Амжилттай нэвтэрлээ",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;