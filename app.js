require("dotenv").config();

const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");

const connectDB = require("./db/connectDB");
const errorHandler = require("./middleware/errorHandler");


const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");


const app = express();

app.use(express.json());


app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});