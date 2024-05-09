const Joi = require('joi');

const RegisterValidation = Joi.object({
  user_name: Joi.string().min(3).max(15).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  mobile_no: Joi.string().max(10).required(),
});

const LoginValidation = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

module.exports = {
  RegisterValidation,
  LoginValidation,
};
