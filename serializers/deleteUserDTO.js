import Joi from 'joi'

export default Joi.object({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().max(255).required()
});