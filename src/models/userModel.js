// models/userModel.js
const users = []; // In-memory, swap for DB in production
const roles = { user: [], admin: [] };

module.exports = { users, roles };
