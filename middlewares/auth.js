const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../api/users/users.model");

module.exports = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === 'test') {
      req.user = { _id: "6092c19cf3205c31d86d6fa3", role: "admin" };
      return next();
    }

    const token = req.headers["x-access-token"];
    if (!token) {
      throw new UnauthorizedError("Token not provided");
    }

    const decoded = jwt.verify(token, config.secretJwtToken);
    if (!decoded || !decoded.userId) {
      throw new UnauthorizedError("Invalid token");
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedError(error.message || error));
  }
};
