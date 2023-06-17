const mongoose = require("mongoose");
const CustomError = require("./customError");

const checkValidObjectId = (obj) => {
  if (!mongoose.Types.ObjectId.isValid(Object.values(obj)[0]))
    throw new CustomError(400, `Invalid ${Object.keys(obj)[0]}`);
};
module.exports = checkValidObjectId;
