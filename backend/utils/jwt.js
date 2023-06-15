const jwt = require("jsonwebtoken");
const { accessSecretKey, refreshSecretKey } = require("../config/constants");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, accessSecretKey, {
    expiresIn: "15s",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, refreshSecretKey, {
    expiresIn: "40s",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
