// app.js
const express = require('express');
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(passport.initialize());

// Use routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => console.log('API running on port 3000'));

module.exports = app;
