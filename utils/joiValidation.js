const Joi = require("joi")

const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    name: Joi.string().required(),
    stringValidation:Joi.string().required(),
    numberValidation:Joi.number().required()
}


module.exports.JoiSchema = schema