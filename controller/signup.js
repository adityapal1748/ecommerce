const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const userModel = require('../models/user.model');
const keys = require('../config/keys');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');
const { JoiSchema } = require("../utils/joiValidation")

// Joi schema for user signup
const signupSchema = Joi.object({
    "name": JoiSchema["name"],
    "email": JoiSchema["email"],
    "password": JoiSchema["password"]
});

// Controller to handle user signup
const signup = async (req, res) => {
    // Validate request body using Joi schema
    try {
        const { error } = signupSchema.validate(req.body);
        if (error) {
            return sendErrorResponse(res, error.details.map(err => err.message).join(', '), 400);
        }

        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await userModel.findOne({ email });
        if (user) {
            return sendErrorResponse(res, 'User already exists', 400);
        }

        // Create new user
        user = new userModel({
            name,
            email,
            password
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        await user.save();

        sendSuccessResponse(res, { data: "User Registered Successfully" }, 200, true);

    } catch (err) {

        sendErrorResponse(res);
    }
};

module.exports = {
    signup
};
