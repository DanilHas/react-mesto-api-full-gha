const { celebrate, Joi } = require('celebrate');
const { regexToCheckUrl } = require('../utils/constants');

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string()
      .default(
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      )
      .regex(regexToCheckUrl),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = { signinValidation, signupValidation };