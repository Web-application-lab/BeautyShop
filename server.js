const express = require("express");
const path = require("path");

const app = express();
const root = __dirname;
const port = Number(process.env.PORT) || 3000;

app.use(express.static(root));

function sendSpa(req, res) {
  res.sendFile(path.join(root, "index.html"));
}

app.get("/c", sendSpa);
app.get("/c/*", sendSpa);

app.listen(port, () => {
  console.log(`BeautyShop running at http://localhost:${port}`);
  console.log(`Example: http://localhost:${port}/c/skincare/cleansing`);
});
