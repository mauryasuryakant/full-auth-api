// controllers/userController.js
const { users } = require('../models/userModel');

exports.profile = (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  // Hide password/hash
  const { password, ...rest } = user;
  res.json(rest);
};
