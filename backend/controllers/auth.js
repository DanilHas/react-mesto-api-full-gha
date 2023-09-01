const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/conflict-err');

const { JWT_SECRET = 'SECRET_KEY', NODE_ENV = 'production' } = process.env;

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) =>
      res.status(201).send({ name, about, avatar, email, _id: user._id }),
    )
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .cookie('loggedIn', 'true', {
          maxAge: 3600000 * 24 * 7,
          sameSite: true,
        })
        .send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email,
          _id: user._id,
        });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Пользователь вышел с аккаунта' });
};

module.exports = { createUser, login, logout };
