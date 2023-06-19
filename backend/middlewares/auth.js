const { accessSecretKey, refreshSecretKey } = require("../config/constants");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

const authenticate = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization)
    throw new CustomError(401, "token not found, please login");
  const token = req.headers.authorization.split(" ")[1];
  if (!token) throw new CustomError(401, "token not found, please login");
  jwt.verify(token, accessSecretKey, (err, data) => {
    if (err) throw new CustomError(401, "token expired");
    req.body.userId = data.userId;
    next();
  });
});

const verifyRefreshToken = asyncHandler(async (req, res, next) => {
  const token = req?.cookies?.jwt;
  if (!token) throw new CustomError(401, "invalid token, please login");
  jwt.verify(token, refreshSecretKey, (err, data) => {
    if (err) throw new CustomError(401, "token expired, please login again");
    req.body.userId = data.userId;
    next();
  });
});

module.exports = { authenticate, verifyRefreshToken };
