// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users, roles } = require('../models/userModel');
const { JWT_SECRET } = require('../config/config');

// Register
exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  if (users.find(u => u.email === email))
    return res.status(409).json({ message: 'Email already exists' });
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, email, password: hashed, role: role || 'user' };
  users.push(user);
  roles[user.role].push(user.id);
  res.status(201).json({ message: 'Registered!' });
};

// Login (JWT issuance)
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

// Google OAuth callback (handled in app.js or passport callback, optionally move here)
