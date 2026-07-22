const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const {
    checkout,
    getOrders,
    getOrder,
    updateStatus,
} = require("../controllers/orderController");

router.post("/", checkout);

router.get("/", getOrders);

router.get("/:id", getOrder);

router.patch("/:id/status", updateStatus);

module.exports = router;