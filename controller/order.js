const Order = require('../models/order.model');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHandler');

const createOrder = async (req, res) => {
  const { userId, products, amount } = req.body;
  
  try {
    const order = new Order({ userId, products, amount });
    await order.save();
    sendSuccessResponse(res, order, );
  } catch (error) {
    console.log(error,"error")
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  createOrder
};
