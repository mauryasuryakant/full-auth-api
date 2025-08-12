// config/config.js
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'your_google_client_id',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'your_google_client_secret'
};
