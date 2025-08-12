// app.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const users = []; // In-memory for demo (use DB in prod)
const roles = { user: [], admin: [] }; // Example role store

const app = express();
app.use(express.json());

// JWT secret
const JWT_SECRET = 'your_jwt_secret';

// Passport Google OAuth2 setup
passport.use(new GoogleStrategy({
    clientID: 'GOOGLE_CLIENT_ID',
    clientSecret: 'GOOGLE_CLIENT_SECRET',
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    // Find or create user logic here
    const user = users.find(u => u.googleId === profile.id);
    if (!user) {
      const newUser = { id: users.length + 1, googleId: profile.id, email: profile.emails[0].value };
      users.push(newUser);
      return cb(null, newUser);
    }
    return cb(null, user);
  }
));
app.use(passport.initialize());

// Register endpoint
app.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, email, password: hashed, role: role || 'user' };
  users.push(user);
  roles[user.role].push(user.id);
  res.status(201).json({ message: 'Registered!' });
});

// Login endpoint (JWT)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Middleware to protect routes
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(401);
  const [, token] = header.split(' ');
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.sendStatus(403);
  }
}

// Role guard middleware
function role(required) {
  return (req, res, next) => {
    if (req.user.role !== required) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}

// Protected route
app.get('/admin', auth, role('admin'), (req, res) => {
  res.json({ message: 'Hello Admin!' });
});

// Google OAuth2 routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  // Issue JWT on successful auth
  const token = jwt.sign({ id: req.user.id, role: req.user.role || 'user' }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(3000, () => console.log('API running on port 3000'));
