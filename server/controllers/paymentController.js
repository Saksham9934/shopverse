import asyncHandler from "express-async-handler";
import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";

let razorpay;
const getRazorpayInstance = () => {
  if (!razorpay) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpay;
};

// @desc  Create a Razorpay order (called from checkout before payment)
// @route POST /api/payments/razorpay/order
const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body; // amount in rupees

  if (!amount || isNaN(amount)) {
    res.status(400);
    throw new Error("A valid amount is required");
  }

  const amountInPaise = Math.round(Number(amount) * 100);

  if (amountInPaise < 100) {
    res.status(400);
    throw new Error("Amount must be at least ₹1 (100 paise)");
  }

  const options = {
    amount: amountInPaise,
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const razorpayOrder = await getRazorpayInstance().orders.create(options);

    res.status(201).json({
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    // Razorpay auth failures come back as statusCode 401 from their SDK
    if (error.statusCode === 401) {
      res.status(401);
      throw new Error("Razorpay authentication failed - check your API keys");
    }
    res.status(500);
    throw new Error(error.error?.description || "Failed to create Razorpay order");
  }
});

// @desc  Verify Razorpay payment signature & mark order as paid
// @route POST /api/payments/razorpay/verify
const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const {
    orderId, // our internal Order _id
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    res.status(400);
    throw new Error("Missing required payment verification fields");
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (!isAuthentic) {
    res.status(400);
    throw new Error("Payment verification failed - invalid signature");
  }

  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    status: "completed",
  };

  const updatedOrder = await order.save();
  res.json({ message: "Payment verified successfully", order: updatedOrder });
});

export { createRazorpayOrder, verifyRazorpayPayment };