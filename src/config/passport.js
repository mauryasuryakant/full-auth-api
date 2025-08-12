// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { users } = require('../models/userModel');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('./config');

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, cb) => {
  let user = users.find(u => u.googleId === profile.id);
  if (!user) {
    user = { id: users.length + 1, googleId: profile.id, email: profile.emails[0].value, role: 'user' };
    users.push(user);
  }
  return cb(null, user);
}));

module.exports = passport;
