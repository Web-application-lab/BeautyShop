const mongoose = require("mongoose");
require("dotenv").config();

const data = require("./products.json");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const db = mongoose.connection.db;

  await db.collection("categories").deleteMany({});
  await db.collection("categories").insertMany(data.categories);
  console.log(`Inserted ${data.categories.length} categories`);

  await db.collection("subcategories").deleteMany({});
  await db.collection("subcategories").insertMany(data.subCategories);
  console.log(`Inserted ${data.subCategories.length} subcategories`);

  await db.collection("products").deleteMany({});
  await db.collection("products").insertMany(data.products);
  console.log(`Inserted ${data.products.length} products`);

  await db.collection("concerns").deleteMany({});
  await db.collection("concerns").insertMany(data.concerns);
  console.log(`Inserted ${data.concerns.length} concerns`);

  await db.collection("navigation").deleteMany({});
  await db.collection("navigation").insertOne(data.categoryNavigation);
  console.log("Inserted categoryNavigation");

  await mongoose.disconnect();
  console.log("Done!");
}

seed().catch(console.error);