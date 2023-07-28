const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');

module.exports = function (req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError();
  }

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new UnauthorizedError();
  }

  req.user = payload;

  next();
  return null;
};
