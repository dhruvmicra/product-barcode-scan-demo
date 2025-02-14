import { useState, useEffect } from "react";

const AddProduct = () => {
  const [sku, setSku] = useState(""); // SKU state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [scanning, setScanning] = useState(false); // Track if scanning is in progress
  const [barcodeBuffer, setBarcodeBuffer] = useState(""); // Buffer for barcode input

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && barcodeBuffer) {
        // Set the SKU when Enter is pressed after scanning
        setSku(barcodeBuffer);
        setBarcodeBuffer(""); // Reset the barcode buffer after scanning
        setScanning(false); // Stop scanning mode
      } else if (event.key.length === 1) {
        // Collect barcode characters when scanning
        if (!scanning) {
          setScanning(true); // Begin scanning process
          setBarcodeBuffer(event.key); // Start filling the barcode buffer
        } else {
          setBarcodeBuffer((prev) => prev + event.key); // Add to barcode buffer
        }
      }
    };

    // Add event listener for keydown to capture barcode scan
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [scanning, barcodeBuffer]); // Depend on scanning and barcodeBuffer state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sku || !name || !price || !stock) {
      alert("Please fill all fields!");
      return;
    }

    const res = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sku, name, price, stock, category }),
    });

    if (res.ok) {
      alert("Product added!");
      setSku(""); // Clear SKU after adding product
      setName("");
      setPrice("");
      setStock("");
      setCategory("");
    } else {
      alert("Error adding product!");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* SKU input */}
        <input
          type="text"
          value={sku}
          placeholder="Scan SKU"
          className="border p-2 rounded w-full"
          readOnly // Prevent manual edits of SKU
        />

        {/* Product Name */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="border p-2 rounded w-full"
        />

        {/* Price */}
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border p-2 rounded w-full"
        />

        {/* Stock */}
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
          className="border p-2 rounded w-full"
        />

        {/* Category */}
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="border p-2 rounded w-full"
        />

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;