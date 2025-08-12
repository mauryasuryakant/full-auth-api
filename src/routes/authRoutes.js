// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Google OAuth2 (same as in app.js; can be moved here)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const jwt = require('jsonwebtoken');
  const { JWT_SECRET } = require('../config/config');
  const token = jwt.sign({ id: req.user.id, role: req.user.role || 'user' }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
