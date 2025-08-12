// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

// Protected profile
router.get('/profile', auth, userController.profile);

// Admin-only route
router.get('/admin-only', auth, role('admin'), (req, res) => {
  res.json({ message: 'Hello Admin!' });
});

module.exports = router;
