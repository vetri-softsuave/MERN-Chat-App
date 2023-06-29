const paramsToBody = (req, res, next) => {
  req.body = { ...req.body, ...req.params };
  next();
};

module.exports = {
  paramsToBody,
};
