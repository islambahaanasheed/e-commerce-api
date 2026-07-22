const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");


const calculateTotal = async (cart) => {
    let total = 0;

    for (const item of cart.items) {
        const product = await Product.findById(item.product);

        if (product) {
            item.price = product.price * item.quantity;
            total += item.price;
        }
    }

    return total;
};


// GET /api/cart
const getCart = asyncHandler(async (req, res) => {
    let cart = await Cart.findOne().populate(
        "items.product",
        "name price images stock"
    );


    if (!cart) {
        cart = await Cart.create({
            items: [],
            totalPrice: 0,
        });
    }

    res.status(200).json({
        status: "success",
        message: "Cart retrieved successfully",
        data: cart,
    });
});


// POST /api/cart/items
const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;


    const product = await Product.findById(productId);

    if (!product) {
        throw new AppError("Product not found", 404);
    }


    if (!product.stock || product.stock < quantity) {
        throw new AppError("Insufficient stock", 400);
    }


    let cart = await Cart.findOne();

    if (!cart) {
        cart = await Cart.create({
            items: [],
            totalPrice: 0,
        });
    }


    const existingItem = cart.items.find(
        item => item.product.toString() === productId
    );


    if (existingItem) {

        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > product.stock) {
            throw new AppError("Insufficient stock", 400);
        }

        existingItem.quantity = newQuantity;
        existingItem.price = product.price * newQuantity;

    } else {
        cart.items.push({
            product: productId,
            quantity,
            price: product.price * quantity,
        });
    }


    cart.totalPrice = await calculateTotal(cart);

    await cart.save();


    cart = await Cart.findById(cart._id).populate(
        "items.product",
        "name price images stock"
    );


    res.status(201).json({
        status: "success",
        message: "Product added to cart successfully",
        data: cart,
    });
});


// PATCH /api/cart/items/:productId
const updateCartItem = asyncHandler(async (req, res) => {

    const { quantity } = req.body;


    let cart = await Cart.findOne();

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }


    const item = cart.items.find(
        item => item.product.toString() === req.params.productId
    );


    if (!item) {
        throw new AppError("Product not found in cart", 404);
    }


    const product = await Product.findById(req.params.productId);


    if (!product) {
        throw new AppError("Product not found", 404);
    }


    if (quantity > product.stock) {
        throw new AppError("Insufficient stock", 400);
    }


    if (quantity <= 0) {

        cart.items = cart.items.filter(
            item => item.product.toString() !== req.params.productId
        );

    } else {

        item.quantity = quantity;
        item.price = product.price * quantity;
    }


    cart.totalPrice = await calculateTotal(cart);

    await cart.save();


    cart = await Cart.findById(cart._id).populate(
        "items.product",
        "name price images stock"
    );


    res.status(200).json({
        status: "success",
        message: "Cart updated successfully",
        data: cart,
    });

});


// DELETE /api/cart/items/:productId
const removeCartItem = asyncHandler(async (req, res) => {

    let cart = await Cart.findOne();

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }


    cart.items = cart.items.filter(
        item => item.product.toString() !== req.params.productId
    );


    cart.totalPrice = await calculateTotal(cart);


    await cart.save();


    cart = await Cart.findById(cart._id).populate(
        "items.product",
        "name price images stock"
    );


    res.status(200).json({
        status: "success",
        message: "Product removed from cart successfully",
        data: cart,
    });

});


// DELETE /api/cart
const clearCart = asyncHandler(async (req, res) => {

    let cart = await Cart.findOne();


    if (!cart) {
        cart = await Cart.create({
            items: [],
            totalPrice: 0,
        });
    } else {
        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();
    }


    res.status(200).json({
        status: "success",
        message: "Cart cleared successfully",
        data: cart,
    });

});


module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};