const { getUserDetails } = require("../services/userService");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");

const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const result = await getUserDetails(userId);
  if (result?._id) res.status(200).send({ user: result });
  else throw new CustomError(400, "Cannot get user details");
});
module.exports = {
  getUser,
};
