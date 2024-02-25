const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

const MONGODB_URI = "mongodb://localhost:27017/Task24";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

app.use(bodyParser.json());

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    console.log("All products:");
    console.log(products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const sampleProducts = [
  {
    id: 1,
    name: "Laptop",
    description: "A powerful laptop for all your computing needs",
    price: 999.99,
  },
  {
    id: 2,
    name: "Smartphone",
    description: "The latest smartphone with advanced features",
    price: 699.99,
  },
  {
    id: 3,
    name: "Headphones",
    description: "High-quality headphones for immersive audio experience",
    price: 149.99,
  },
  {
    id: 4,
    name: "Tablet",
    description:
      "A sleek and portable tablet for entertainment and productivity",
    price: 399.99,
  },
  {
    id: 5,
    name: "Smartwatch",
    description: "Stay connected and track your fitness with this smartwatch",
    price: 249.99,
  },
];

async function initializeSampleProducts() {
  try {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("Sample products initialized successfully");
  } catch (error) {
    console.error("Error initializing sample products:", error);
  }
}

initializeSampleProducts();

app.get("/", (req, res) => {
  res.send("Hello User! This is Task-24");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});