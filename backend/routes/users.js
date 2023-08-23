const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getCurrentUser,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');
const { regexToCheckUrl } = require('../utils/constants');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
      about: Joi.string().min(2).max(30).default('Исследователь'),
    }),
  }),
  updateProfile,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .default(
          'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
        )
        .regex(regexToCheckUrl),
    }),
  }),
  updateAvatar,
);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getCurrentUser,
);

module.exports = router;
