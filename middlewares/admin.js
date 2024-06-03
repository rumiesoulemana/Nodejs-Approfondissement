const UnauthorizedError = require("../errors/unauthorized");

module.exports = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new UnauthorizedError(message));
  }
  next();
};
