const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(1200).email().required(),
    password: Joi.string().min(6).max(1200).required(),
    phone: Joi.number().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
  });
  return schema.validate(data);
};
const LoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(1200).email().required(),
    password: Joi.string().min(6).max(1200).required(),
  });
  return schema.validate(data);
};
module.exports.registerValidation = registerValidation;
module.exports.LoginValidation = LoginValidation;