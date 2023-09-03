const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

const findById = (req, res, next, id) => {
  User.findById(id)
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateUserData = (req, res, next, id, { ...userData }) => {
  User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getUsers = (req, res, next) =>
  User.find()
    .then((users) => res.status(200).send(users))
    .catch(next);

const getCurrentUser = (req, res, next) => {
  const { userId } = req.params;

  return findById(req, res, next, userId);
};

const updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  return updateUserData(req, res, next, userId, { name, about });
};

const updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  return updateUserData(req, res, next, userId, { avatar });
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  return findById(req, res, next, userId);
};

module.exports = {
  getUsers,
  getCurrentUser,
  updateProfile,
  updateAvatar,
  getUserInfo,
};
