require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./db/connectDB");

const Category = require("./models/Category");
const Product = require("./models/Product");
const Order = require("./models/order.model");

const seedDatabase = async () => {
  try {
    await connectDB();

    await Order.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});

    const categories = await Category.insertMany([
      {
        name: "Electronics",
        description: "Electronic devices and accessories",
      },
      {
        name: "Clothing",
        description: "Fashion and apparel",
      },
      {
        name: "Home & Kitchen",
        description: "Home appliances and kitchen essentials",
      },
    ]);

    // Create products
    const products = [
      {
        name: "Wireless Headphones",
        description: "Noise-cancelling Bluetooth headphones",
        price: 99.99,
        stock: 50,
        category: categories[0]._id,
      },
      {
        name: "Gaming Mouse",
        description: "RGB gaming mouse",
        price: 49.99,
        stock: 30,
        category: categories[0]._id,
      },
      {
        name: "Men's T-Shirt",
        description: "100% cotton T-shirt",
        price: 19.99,
        stock: 100,
        category: categories[1]._id,
      },
      {
        name: "Women's Hoodie",
        description: "Warm fleece hoodie",
        price: 39.99,
        stock: 40,
        category: categories[1]._id,
      },
      {
        name: "Coffee Maker",
        description: "12-cup programmable coffee maker",
        price: 79.99,
        stock: 15,
        category: categories[2]._id,
      },
      {
        name: "Blender",
        description: "High-speed kitchen blender",
        price: 59.99,
        stock: 20,
        category: categories[2]._id,
      },
    ];

    const insertedProducts = await Product.insertMany(products);

    console.log(
      `Database seeded successfully! Added ${categories.length} categories and ${insertedProducts.length} products.`
    );
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();