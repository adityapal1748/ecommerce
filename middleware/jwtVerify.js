const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { sendErrorResponse } = require('../utils/responseHandler');

// Middleware function to verify JWT token
const jwtVerify = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization');

  // Check if token is present
  if (!token) {
    return sendErrorResponse(res, 'No token, authorization denied', 401);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, keys.jwtSecret);

    // Attach user from token payload to request object
    req.user = decoded.user;
    next();

  } catch (err) {
    sendErrorResponse(res, 'Token is not valid', 401);
  }
};

module.exports = jwtVerify;
