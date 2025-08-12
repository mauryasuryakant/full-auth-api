// server.js
require('dotenv').config();            // Loads environment variables from .env
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
