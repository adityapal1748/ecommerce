const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/user.model');
const keys = require('../config/keys');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHandler');
const {JoiSchema} = require("../utils/joiValidation");
const {signToken } = require('../utils/jwt');
// Joi schema for user login
const loginSchema = Joi.object({
  "email":JoiSchema["email"],
  "password":JoiSchema["password"]
});

// Controller to handle user login
const login = async (req, res) => {
  // Validate request body using Joi schema
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, error.details.map(err => err.message).join(', '), 400);
    }

    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 'Invalid credentials', 401);
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendErrorResponse(res, 'Invalid credentials', 401);
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id // mongoose-generated ObjectId
      }
    };

    // Generate JWT token
    const jwtRes = await signToken(payload)

    if(!jwtRes.success){
        return sendErrorResponse(res,jwtRes.message,500);
    }
    return sendSuccessResponse(res,{token:jwtRes.token},200,true)

  } catch (err) {
    sendErrorResponse(res);
  }
};

module.exports = {
  login
};
