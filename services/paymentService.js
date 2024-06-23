const axios = require('axios');
const Payment = require('../models/payment.model');
const { default: mongoose } = require('mongoose');

// Load the environment variables from .env file
require('dotenv').config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeHeaders = {
  Authorization: `Bearer ${stripeSecretKey}`,
  'Content-Type': 'application/x-www-form-urlencoded'
};

const createStripePaymentIntent = async (amount, currency) => {
  try{
    const response = await axios.post(
      'https://api.stripe.com/v1/payment_intents',
      new URLSearchParams({ amount, currency }).toString(),
      { headers: stripeHeaders }
    );
    return response.data;

  }catch(err){
    console.log(err)
  }
};

const confirmStripePayment = async (paymentIntentId) => {
  const response = await axios.post(
    `https://api.stripe.com/v1/payment_intents/${paymentIntentId}/confirm`,
    {},
    { headers: stripeHeaders }
  );
  return response.data;
}; 

const savePayment = async (userId, orderId, paymentProvider, paymentData) => {
  const payment = new Payment({
    userId,
    orderId,
    paymentProvider,
    paymentId: paymentData.id,
    amount: paymentData.amount,
    currency: paymentData.currency,
    status: paymentData.status
  });
  await payment.save();
  return payment;
};

module.exports = {
  createStripePaymentIntent,
  confirmStripePayment,
  savePayment
};
