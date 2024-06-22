const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Function to generate JWT token
const signToken = (payload, expiresIn = '1h') => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, keys.jwtSecret, { expiresIn }, (err, token) => {
      if (err) {
        reject({err,"success":false});
      } else {
        resolve({token,"success":true});
      }
    });
  });
};

module.exports = {
  signToken
};
