// middleware/roleMiddleware.js
module.exports = function(required) {
  return (req, res, next) => {
    if (req.user.role !== required) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
};
