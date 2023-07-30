const Card = require('../models/card');
const BadRequestError = require('../errors/bad-requesr');
const NotFoundError = require('../errors/not-found');
const ForbidenError = require('../errors/forbiden');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({
      data: {
        _id: card._id,
        name: card.name,
        link: card.link,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка не найдена'));
        return;
      }
      next(err);
    });
};
module.exports.deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (card.owner.toString() !== ownerId) {
        throw new ForbidenError('Попытка удаления чужой карточки');
      }
      return card;
    })
    .then((card) => Card.remove(card))
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Карточка не найдена'));
        return;
      }
      next(err);
    });
};
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка не найдена'));
        return;
      }
      next(err);
    });
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true, runValidators: true },
  )
    .orFail()
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка не найдена'));
        return;
      }
      next(err);
    });
};
