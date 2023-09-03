const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

const findItemById = (model, id, errorText) => {
  model.findById(id)
  .orFail(new NotFoundError(errorText))
    .then((item) => item)
};

const findByIdDecorator = (func) =>
  function(model, id, errorText) {
    if (id) {
      return Promise.then((item) => item);
    }

    return func(model, id, errorText);
  }
;

const findById = findByIdDecorator(findItemById);

const getUsers = (req, res, next) =>
  User.find()
    .then((users) => res.status(200).send(users))
    .catch(next);

const getCurrentUser = (req, res, next) => {
  const { userId } = req.params;

  findById(User, userId, 'Запрашиваемый пользователь не найден')
  .then((user) => res.status(200).send(user))
  .catch(next);

  // User.findById(userId)
  //   .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
  //   .then((user) => res.status(200).send(user))
  //   .catch(next);
};

const updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  findById(User, userId, 'Запрашиваемый пользователь не найден')
  .then((user) => res.status(200).send(user))
  .catch(next);

  // User.findById(userId)
  //   .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
  //   .then((user) => res.status(200).send(user))
  //   .catch(next);
};

module.exports = {
  getUsers,
  getCurrentUser,
  updateProfile,
  updateAvatar,
  getUserInfo,
};
