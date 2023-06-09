const { getUserDetails, findUsers } = require("../services/userService");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");

const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const result = await getUserDetails(userId);
  if (result?._id) res.status(200).send({ user: result });
  else throw new CustomError(400, "Cannot get user details");
});

const searchUsers = asyncHandler(async (req, res) => {
  const query = req.query;
  const users = await findUsers(query, req.body.userId);
  if (!users || users?.length < 1) res.status(204).send({ users: [] });
  else res.send({ users });
});
module.exports = {
  getUser,
  searchUsers,
  searchUsers,
};
