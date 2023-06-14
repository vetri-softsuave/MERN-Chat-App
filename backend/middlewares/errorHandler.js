const errorHandler = (error, req, res, next) => {
  const response = {};
  response.statusCode = error?.statusCode || 500;
  response.status = error?.status || "failed";
  response.message = error?.message || "Something went wrong";
  console.log("error msg:", error);
  res.status(response.statusCode).send(response);
};

module.exports = errorHandler;
