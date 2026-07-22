const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");


// POST /api/orders
const checkout = asyncHandler(async (req, res) => {
    const { shippingAddress } = req.body;


    if (!shippingAddress) {
        throw new AppError("Shipping address is required.", 400);
    }


    const cart = await Cart.findOne().populate("items.product");


    if (!cart || cart.items.length === 0) {
        throw new AppError("Cart is empty.", 400);
    }


    let totalPrice = 0;
    const orderItems = [];


    for (const item of cart.items) {

        const product = await Product.findById(item.product._id);


        if (!product) {
            throw new AppError("Product not found.", 404);
        }


        if (product.stock < item.quantity) {
            throw new AppError(
                `${product.name} does not have enough stock.`,
                400
            );
        }


        totalPrice += product.price * item.quantity;


        orderItems.push({
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
        });


        product.stock -= item.quantity;

        await product.save();
    }


    const order = await Order.create({
        orderNumber: `ORD-${Date.now()}`,
        items: orderItems,
        totalPrice,
        shippingAddress,
        status: "pending",
    });

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();


    res.status(201).json({
        status: "success",
        message: "Order created successfully",
        data: order,
    });
});



// GET /api/orders
const getOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find()
        .populate(
            "items.product",
            "name price images"
        );


    res.status(200).json({
        status: "success",
        message: "Orders retrieved successfully",
        data: orders,
    });
});



// GET /api/orders/:id
const getOrder = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)
        .populate(
            "items.product",
            "name price images"
        );


    if (!order) {
        throw new AppError("Order not found.", 404);
    }


    res.status(200).json({
        status: "success",
        message: "Order retrieved successfully",
        data: order,
    });
});



// PATCH /api/orders/:id/status
const updateStatus = asyncHandler(async (req, res) => {

    const { status } = req.body;


    const allowedStatuses = [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
    ];


    if (!status) {
        throw new AppError("Status is required.", 400);
    }


    if (!allowedStatuses.includes(status)) {
        throw new AppError(
            "Invalid order status.",
            400
        );
    }


    const order = await Order.findById(req.params.id);


    if (!order) {
        throw new AppError(
            "Order not found.",
            404
        );
    }


    order.status = status;


    await order.save();


    res.status(200).json({
        status: "success",
        message: "Order status updated successfully",
        data: order,
    });
});


module.exports = {
    checkout,
    getOrders,
    getOrder,
    updateStatus,
};