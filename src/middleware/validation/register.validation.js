const Joi = require('joi');

const RegisterValidation = Joi.object({
  user_name: Joi.string(),
});
