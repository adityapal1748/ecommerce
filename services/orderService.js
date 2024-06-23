const Order = require('../models/order.model');

const createOrder = async (userId, products, amount) => {
  const order = new Order({ userId, products, amount });
  await order.save();
  return order;
};

module.exports = {
  createOrder
};
