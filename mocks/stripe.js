const nock = require('nock');

// Mock Stripe payment intent creation
nock('https://api.stripe.com')
    .post('/v1/payment_intents')
    .reply(200, {
        id: 'pi_1ExAmpLe0TYclXEYP5MZkZa',
        amount: 2000,
        currency: 'usd',
        status: 'succeeded'
    });

// Mock Stripe payment confirmation
nock('https://api.stripe.com')
    .post('/v1/payment_intents/pi_1ExAmpLe0TYclXEYP5MZkZa/confirm')
    .reply(200, {
        id: 'pi_1ExAmpLe0TYclXEYP5MZkZa',
        amount: 2000,
        currency: 'usd',
        status: 'succeeded'
    });
