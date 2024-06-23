const express = require('express');
const { createPaymentIntent, confirmPayment } = require('../controller/paymentController');
const jwtVerify = require('../middleware/jwtVerify');

const router = express.Router();

router.post('/create-payment-intent', jwtVerify, createPaymentIntent);
router.post('/confirm', jwtVerify, confirmPayment);

module.exports = router;
