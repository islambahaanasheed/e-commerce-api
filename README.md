# RESTful E-commerce Backend API

A RESTful E-commerce Backend API built using Node.js, Express.js, and MongoDB.

---

## Features

- Product CRUD Operations
- Category CRUD Operations
- Product Filtering
- Shopping Cart
- Order Creation
- Order History
- MongoDB Database
- Mongoose Populate
- Global Error Handling
- Custom AppError Class
- Async Handler Middleware

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Installation

Clone the repository

```bash
git clone https://github.com/islambahaanasheed/project-lvl-4-backend.git
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
MONGO_URI=your_mongodb_connection_string
```

Run the server

```bash
npm run dev
```

---

## API Endpoints

### Products

GET `/api/products`

POST `/api/products`

PUT `/api/products/:id`

DELETE `/api/products/:id`

---

### Categories

GET `/api/categories`

POST `/api/categories`

PUT `/api/categories/:id`

DELETE `/api/categories/:id`

---

### Cart

GET `/api/cart`

POST `/api/cart`

DELETE `/api/cart/:productId`

---

### Orders

POST `/api/orders`

GET `/api/orders`

---

## Project Structure

```
config/
controllers/
middleware/
models/
routes/
utils/
server.js
```

---

## Author

Islam Bahaa