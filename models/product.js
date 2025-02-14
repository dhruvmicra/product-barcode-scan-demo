import mongoose from "mongoose";

// Define Product Schema
const ProductSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true }, // Barcode / SKU
  name: { type: String, required: true }, // Product Name
  price: { type: Number, required: true }, // Product Price
  stock: { type: Number, default: 0 }, // Stock Quantity (optional)
  description: { type: String }, // Product Description (optional)
  category: { type: String }, // Category (optional)
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

// Create Product Model (only if it doesn't already exist)
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
