import { useState, useEffect } from "react";

const Invoice = () => {
  const [products, setProducts] = useState([]);
  const [barcode, setBarcode] = useState(""); // Barcode state to store scanned barcode

  useEffect(() => {
    const handleScan = async (event) => {
      console.log({ test: event });

      if (event.key.length === 1) {
        // Capture each character of the barcode
        setBarcode((prev) => prev + event.key);
      }

      if (event.key === "Enter") {
        event.preventDefault();
        if (barcode) {
          // When Enter is pressed, pass the barcode to addProduct
          await addProduct(barcode);
          setBarcode(""); // Reset barcode state after processing
        }
      }
    };

    window.addEventListener("keydown", handleScan);
    return () => window.removeEventListener("keydown", handleScan);
  }, [barcode]); // Track barcode changes

  // Add the product by SKU to the invoice
  const addProduct = async (sku) => {
    const res = await fetch(`/api/product?sku=${sku}`);
    const data = await res.json();

    if (!res.ok || !data) {
      alert("Product not found!");
      return;
    }

    setProducts((prev) => {
      const existingProduct = prev.find((p) => p.sku === sku);
      if (existingProduct) {
        return prev.map((p) =>
          p.sku === sku ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...data, quantity: 1 }];
      }
    });
  };

  // Calculate the total price of the invoice
  const getTotalPrice = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Invoice</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">SKU</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.sku}>
              <td className="border p-2">{product.sku}</td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">${product.price}</td>
              <td className="border p-2">{product.quantity}</td>
              <td className="border p-2">${product.price * product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right font-bold text-lg">
        Total: ${getTotalPrice()}
      </div>
    </div>
  );
};

export default Invoice;
