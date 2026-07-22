const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
    },

    price: {
        type: Number,
        default: 0,
    }
});

const cartSchema = new mongoose.Schema(
    {
        items: [cartItemSchema],

        totalPrice: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Cart", cartSchema);