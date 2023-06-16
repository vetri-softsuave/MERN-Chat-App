const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");

const errorHandler = (error, req, res, next) => {
  const response = {};
  response.statusCode = error?.statusCode || 500;
  response.status = error?.status || "failed";
  response.message = error?.message || "Something went wrong";
  console.log("error msg:", error);
  res.status(response.statusCode).send(response);
};

const notFound = asyncHandler(async (req, res, next) => {
  throw new CustomError(404, `${req.originalUrl} Not Found`);
});

module.exports = {errorHandler, notFound};
