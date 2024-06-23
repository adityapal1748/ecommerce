const { createOrder } = require('../services/orderService');
const { createStripePaymentIntent, savePayment, confirmStripePayment } = require('../services/paymentService');
const { JoiSchema } = require('../utils/joiValidation');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHandler');

const createPaymentIntent = async (req, res) => {
  const createPaymentIntentSchema = Joi.object({
    userId: JoiSchema.stringValidation,
    orderId: JoiSchema.stringValidation,
    amount: JoiSchema.numberValidation,
    currency: JoiSchema.stringValidation
  });
  const { error, value } = createPaymentIntentSchema.validate(req.body);
  if (error) {
    return sendErrorResponse(res, error.details[0].message);
  }

  const { userId, orderId, amount, currency } = value;
  try {
    const paymentIntent = await createStripePaymentIntent(amount, currency);
    const payment = await savePayment(userId, orderId, 'stripe', paymentIntent);

    sendSuccessResponse(res, {payment});
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const confirmPayment = async (req, res) => {
  const { paymentIntentId, userId, products, amount } = req.body;

  try {
    const confirmedPayment = await confirmStripePayment(paymentIntentId);
    // Update the payment status in the database
    const payment = await Payment.findOneAndUpdate(
      { paymentId: paymentIntentId },
      { status: confirmedPayment.status },
      { new: true }
    );

    if (payment.status === 'succeeded') {
      // Create the order after successful payment
      const order = await createOrder(userId, products, amount);
      sendSuccessResponse(res, { payment, order }, 'Payment confirmed and order created successfully.');
    } else {
      sendErrorResponse(res, 'Payment not successful.');
    }
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};


module.exports = {
  createPaymentIntent,
  confirmPayment
};
