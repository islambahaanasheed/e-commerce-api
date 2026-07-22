const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} = require("../controllers/cartController");

router.get("/", getCart);

router.post("/items", addToCart);

router.patch("/items/:productId", updateCartItem);

router.delete("/items/:productId", removeCartItem);

router.delete("/", clearCart);

module.exports = router;