const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'IncorrectDataError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'NotFoundError') {
        return res.status(404).send({ message: 'Пользователь не найден.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      },
    }))
    .catch((err) => {
      if (err.name === 'IncorrectDataError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'NotFoundError') {
        return res.status(404).send({ message: 'Пользователь не найден.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'IncorrectDataError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'NotFoundError') {
        return res.status(404).send({ message: 'Пользователь не найден.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'IncorrectDataError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'NotFoundError') {
        return res.status(404).send({ message: 'Пользователь не найден.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'IncorrectDataError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'NotFoundError') {
        return res.status(404).send({ message: 'Пользователь не найден.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
