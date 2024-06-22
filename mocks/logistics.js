const nock = require('nock');

// Mock logistics provider API for creating a shipment
nock('https://api.logisticsprovider.com')
  .post('/v1/shipments')
  .reply(200, {
    id: 'SHIP123456',
    status: 'created',
    tracking_number: 'TRACK123456'
  });

// Mock logistics provider API for tracking a shipment
nock('https://api.logisticsprovider.com')
  .get('/v1/shipments/TRACK123456')
  .reply(200, {
    id: 'SHIP123456',
    status: 'in_transit',
    tracking_number: 'TRACK123456',
    estimated_delivery: '2024-07-01T00:00:00Z'
  });
