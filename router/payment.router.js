const express = require('express');
const { createPaymentIntent, confirmPayment } = require('../controller/paymentController');
const jwtVerify = require('../middleware/jwtVerify');
const { createOrder } = require('../controller/order');

const router = express.Router();

router.post('/create', jwtVerify, createOrder);
router.post('/create-payment-intent', jwtVerify, createPaymentIntent);
router.post('/confirm-payment', jwtVerify, confirmPayment);

module.exports = router;
