const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexp } = require('../utils/constans');

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regexp),
  }),
}), createCard);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
