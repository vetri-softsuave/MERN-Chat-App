const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config/constants");

const generateToken = (userId) => {
  return jwt.sign({ userId }, jwtSecretKey, {
    expiresIn: "1d",
  });
};

module.exports = generateToken;
