# RESTful E-commerce Backend API

A RESTful E-commerce Backend API built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**. The API allows clients to manage products, categories, shopping carts, and orders through RESTful endpoints. It demonstrates CRUD operations, product filtering, shopping cart management, checkout processing, MongoDB relationships using Mongoose, validation, and centralized error handling.

---

# Features

- Product CRUD Operations
- Category CRUD Operations
- Product Filtering (category, price, stock, search)
- Shopping Cart Management
- Checkout & Order Creation
- Order History
- Order Status Updates
- MongoDB Database Integration
- Mongoose Populate
- Express Validator
- Global Error Handling
- Custom AppError Class
- Async Handler Middleware

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

---

# Prerequisites

Before running the project, make sure you have installed:

- Node.js
- npm
- MongoDB Atlas account (or a local MongoDB instance)
- Git

---

# Installation

## 1. Install Node.js if doesn't exist

Open Command Prompt from Windows bar and check whether Node.js and npm are installed or not:

```bash
node -v
npm -v
```

If you get version numbers, then you can skip to step 2, else Download and install the LTS (Long-Term Support) version from:
https://nodejs.org/en/download


## 2. Clone the repository

```bash
git clone https://github.com/islambahaanasheed/islam-bahaa-ecommerce-backend.git
```

## 3. Navigate to the project folder
```bash
cd islam-bahaa-ecommerce-backend
```

## 4. Install dependencies

```bash
npm install
```

## 5. Connect to mongoDB

1. Create a free account at MongoDB Atlas.
2. Create a cluster.
3. Create a database user (make sure to save the password generated).
4. Copy the connection string.
    if it's not visible, you can find it as follows:
    1. Open "Clusters" from the left side bar 
    2. Click "Connect" next to the cluster name
    3. Choose "Drivers"
    4. At the "Add your connection string into your application code" section, the connection string can be found (replace the password after copying)


## 6. Configure environment variables

Create a `.env` file in the project root (or copy `.env.example`).

Add the following to it:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
```

Replace the connection string (MONGO_URI) with the one obtained from mongoDB


## 7. Seed the database

```bash
node seed.js
```

## 8. Start the application

```bash
node app.js
```

The server will start on:

```
http://localhost:5000
```

## 9. Test API.s

Open postman and import the postman collection and environment located inside the "postman" folder in this project

Select the environment

Start sending requests to the different API.s in the collection


---

# Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Port used by the Express server | 5000 |
| NODE_ENV | Application environment | development |
| MONGO_URI | MongoDB connection string | mongodb+srv://username:password@cluster.mongodb.net/ecommerce |

---

# API Endpoints

## Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Retrieve all products |
| GET | `/api/products/:id` | Retrieve a product by ID |
| POST | `/api/products` | Create a new product |
| PATCH | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

### Available Product Filters

| Query Parameter | Description |
|----------------|-------------|
| category | Filter by category ID |
| search | Search by product name or description |
| minPrice | Minimum product price |
| maxPrice | Maximum product price |
| inStock | Filter products currently in stock |

Example:

```
GET /api/products?search=speaker&minPrice=100&maxPrice=500
```

---

## Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Retrieve all categories |
| GET | `/api/categories/:id` | Retrieve a category by ID |
| POST | `/api/categories` | Create a category |
| PATCH | `/api/categories/:id` | Update a category |
| DELETE | `/api/categories/:id` | Delete a category |

---

## Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Retrieve the shopping cart |
| POST | `/api/cart/items` | Add an item to the cart |
| PATCH | `/api/cart/items/:productId` | Update item quantity |
| DELETE | `/api/cart/items/:productId` | Remove an item from the cart |
| DELETE | `/api/cart` | Clear the shopping cart |

---

## Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Checkout and create a new order |
| GET | `/api/orders` | Retrieve all orders |
| GET | `/api/orders/:id` | Retrieve a specific order |
| PATCH | `/api/orders/:id/status` | Update an order status |

---

# Project Structure

```
ecommerce-api/
├── config/             # Application configuration
├── controllers/        # Business logic for each resource
├── db/                 # MongoDB connection
├── middleware/         # Error handling middleware
├── models/             # Mongoose schemas
├── routes/             # Express routes
├── utils/              # Helper classes and utilities
├── app.js              # Application entry point
├── .env.example        # Example environment variables
├── package.json
└── README.md
```

### Folder Description

- **config/** – Application configuration files.
- **controllers/** – Handles business logic for API requests.
- **db/** – MongoDB database connection.
- **middleware/** – Global middleware such as error handling.
- **models/** – Mongoose schemas and models.
- **routes/** – API route definitions.
- **utils/** – Utility classes such as `AppError` and `asyncHandler`.

---

# Error Handling

All API responses follow a consistent format.

### Success Response

```json
{
  "status": "success",
  "message": "Products retrieved successfully",
  "data": []
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Product not found"
}
```

---

# Author

**Islam Bahaa**