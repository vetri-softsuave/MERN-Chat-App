const asyncHandler = require("express-async-handler");
const validate = (schema) =>
  asyncHandler(async (req, res, next) => {
    await schema.validate({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  });

module.exports = validate
