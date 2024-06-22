const axios = require('axios');

const createShipment = async (shipmentDetails) => {
  const response = await axios.post('https://api.logisticsprovider.com/v1/shipments', shipmentDetails);
  return response.data;
};

const trackShipment = async (trackingNumber) => {
  const response = await axios.get(`https://api.logisticsprovider.com/v1/shipments/${trackingNumber}`);
  return response.data;
};

module.exports = {
  createShipment,
  trackShipment
};
