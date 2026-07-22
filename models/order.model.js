const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                name: {
                    type: String,
                    required: true,
                },

                price: {
                    type: Number,
                    required: true,
                    min: 0,
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],

        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "shipped",
                "delivered",
                "cancelled",
            ],
            default: "pending",
        },

        shippingAddress: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);