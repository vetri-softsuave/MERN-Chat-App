const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    console.log("schema err:", error)
    res.status(400).send({message: error.message});
  }
};

module.exports = validate;
