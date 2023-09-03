const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');
const {
  updateProfileValidation,
  updateAvatarValidation,
  getCurrentUserValidation,
} = require('../requestsValidation/users');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.patch('/me', updateProfileValidation, updateProfile);

router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

router.get('/:userId', getCurrentUserValidation, getCurrentUser);

module.exports = router;
