const jwt = require("jsonwebtoken");
const { accessSecretKey, refreshSecretKey } = require("../config/constants");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, accessSecretKey, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, refreshSecretKey, {
    expiresIn: "1d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
