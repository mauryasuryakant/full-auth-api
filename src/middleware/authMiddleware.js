// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

module.exports = function(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(401);
  const [, token] = header.split(' ');
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};
