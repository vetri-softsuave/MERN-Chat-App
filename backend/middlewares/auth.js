const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) throw new CustomError(401, "please login");
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
    if (err) throw new CustomError(400, err.message || "please login again");
    req.userId = data.userId;
    next();
  });
});

module.exports = authenticate;
