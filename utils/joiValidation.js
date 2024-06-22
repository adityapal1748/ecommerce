const Joi = require("joi")

const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    name: Joi.string().required(),
}


module.exports.JoiSchema = schema