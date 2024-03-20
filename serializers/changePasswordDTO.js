import Joi from 'joi'

export default Joi.object({
    password: Joi.string().max(255).required(),
    new_password: Joi.string().min(6).max(255).required()
});