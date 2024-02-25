const express = require("express");
const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/Task25";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const productSchema = new mongoose.Schema({
  name: String,
});

const Product = mongoose.model("Product", productSchema);

const app = express();
const port = 3000;

async function createProductNameIndex() {
  try {
    await Product.createIndexes({ name: 1 });
    console.log('Index created on "name" field of "Product" collection');
  } catch (error) {
    console.error("Error creating index:", error);
  }
}

createProductNameIndex();

app.get("/", (req, res) => {
  res.send("Hello User! this is Task-25");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});