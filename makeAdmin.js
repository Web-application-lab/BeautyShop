// makeAdmin.js
const mongoose = require("mongoose");
require("dotenv").config();

async function makeAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db;
  
  await db.collection("users").updateOne(
    { email: "b.lkhamjav@yahoo.com" },
    { $set: { isAdmin: true } }
  );
  
  console.log("Admin болголоо!");
  await mongoose.disconnect();
}

makeAdmin().catch(console.error);