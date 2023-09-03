const { celebrate, Joi } = require('celebrate');
const { regexToCheckUrl } = require('../utils/constants');

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто').required(),
    about: Joi.string().min(2).max(30).default('Исследователь').required(),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .default(
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      )
      .regex(regexToCheckUrl)
      .required(),
  }),
});

const getCurrentUserValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  updateProfileValidation,
  updateAvatarValidation,
  getCurrentUserValidation,
};
