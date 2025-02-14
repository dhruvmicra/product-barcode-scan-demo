import Product from "@/models/product";
import mongoose from "mongoose";

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Add new product
    const { sku, name, price, stock, description, category } = req.body;
    const existingProduct = await Product.findOne({ sku });

    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists!" });
    }

    const newProduct = new Product({ sku, name, price, stock, description, category });
    await newProduct.save();

    return res.status(201).json({ message: "Product added successfully!" });
  }

  if (req.method === "GET") {
    const { sku } = req.query; // Extract SKU from query params

    if (!sku) {
      return res.status(400).json({ message: "SKU is required" });
    }

    // Fetch the product with the specified SKU
    const product = await Product.findOne({ sku });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product); // Return the found product
  }
}
