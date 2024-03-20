import Joi from 'joi'

export default Joi.object({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(6).max(255).required()
});

// Example of errors
// email: Joi.string().email().required().messages({
//     'string.base': `Email should be a type of 'text'`,
//     'string.empty': `Email cannot be an empty field`,
//     'string.min': `Email should have a minimum length of {#limit}`,
//     'any.required': `Email is a required field`,
//     'string.email': 'Email must be a valid email',
// })
// password: Joi.string().min(6).required().messages({
//     'string.base': `Password should be a type of 'text'`,
//     'string.empty': `Password cannot be an empty field`,
//     'string.min': `Password should have a minimum length of {#limit}`,
//     'any.required': `Password is a required field`
// })