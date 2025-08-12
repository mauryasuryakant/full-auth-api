// utils/validator.js
exports.isValidEmail = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

exports.isValidPassword = pwd =>
  typeof pwd === 'string' && pwd.length >= 6;
