const { createStripePaymentIntent, confirmStripePayment, savePayment } = require('../services/paymentService');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHandler');

const createPaymentIntent = async (req, res) => {
  const { userId, orderId, amount, currency } = req.body;
  
  try {
    if(!userId || !orderId || !amount|| !currency ){
        console.log("error")
    }
    const paymentIntent = await createStripePaymentIntent(amount, currency);
    console.log("paymentIntent")
    const payment = await savePayment(userId, orderId, 'stripe', paymentIntent);
    console.log(payment)

    sendSuccessResponse(res, payment, 'Payment intent created successfully.');
  } catch (error) {
    console.log("HERE")
    sendErrorResponse(res, error.message);
  }
};

const confirmPayment = async (req, res) => {
  const { paymentIntentId } = req.body;
  
  try {
    const confirmedPayment = await confirmStripePayment(paymentIntentId);
    // Update the payment status in the database
    const payment = await Payment.findOneAndUpdate(
      { paymentId: paymentIntentId },
      { status: confirmedPayment.status },
      { new: true }
    );
    sendSuccessResponse(res, payment, 'Payment confirmed successfully.');
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  createPaymentIntent,
  confirmPayment
};
