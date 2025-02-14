
# Product and Invoice Management System

A web application designed for businesses to manage products and invoices efficiently. With barcode scanning capabilities, the app enables users to add products, generate invoices, and track inventory in real-time.

## Features

- **Product Management**: Add products to the inventory by scanning barcodes. Automatically stores details such as SKU, name, price, stock, description, and category.
- **Invoice Generation**: Create invoices by scanning product barcodes. Automatically fills product details (SKU, name, price) and adjusts quantities.
- **Real-Time Updates**: Inventory and invoice quantities are updated in real time.
- **Barcode Scanning**: Supports barcode scanning for both product addition and invoice creation.
- **Price Calculation**: Automatically calculates the total price based on product quantities and prices.

## Technologies

- **Frontend**: React.js, Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Barcode Scanning**: Browser-based keydown events for barcode input

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance like MongoDB Atlas)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/product-invoice-management.git
cd product-invoice-management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
```

### 4. Run the Application

```bash
npm run dev
```

Your app will be accessible at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### **POST** `/api/product`

Adds a new product to the inventory.

**Request Body**:

```json
{
  "sku": "product-sku",
  "name": "Product Name",
  "price": 100,
  "stock": 50,
  "description": "Product Description",
  "category": "Category Name"
}
```

**Response**:

- **201 Created**: Product added successfully.
- **400 Bad Request**: Product with the same SKU already exists.

---

### **GET** `/api/product?sku=sku`

Fetches product details by SKU.

**Response**:

- **200 OK**: Product details (SKU, name, price, stock, etc.)
- **404 Not Found**: Product not found.

## Usage

1. **Add Products**: 
   - Scan a barcode to auto-fill product details and add it to the inventory.
   - If it's a new product, provide additional details to save it.

2. **Create Invoices**: 
   - Scan product barcodes to add products to the invoice.
   - The app automatically adjusts product quantities and calculates the total price.

3. **View Invoice Total**: 
   - The invoice total is updated in real-time based on the products and quantities.
