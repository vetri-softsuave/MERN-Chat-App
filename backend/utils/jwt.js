const jwt = require("jsonwebtoken");
const { accessSecretKey, refreshSecretKey } = require("../config/constants");

const generateAccessToken = async (userId) => {
  return jwt.sign({ userId }, accessSecretKey, {
    expiresIn: "15s",
  });
};

const generateRefreshToken = async (userId) => {
  return jwt.sign({ userId }, refreshSecretKey, {
    expiresIn: "1d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
