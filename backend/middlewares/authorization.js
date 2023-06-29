const Chat = require("../models/chatModel");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const checkValidObjectId = require("../utils/mongoose");

const isGroupAdmin = asyncHandler(async (req, res, next) => {
  const { groupId } = req.body;
  checkValidObjectId({ groupId });
  const chat = await Chat.findOne({ _id: groupId, group_admin: req?.userId });
  if (!chat?._id)
    throw new CustomError(403, "Group admin only have access to this");
  else next();
});

module.exports = {
  isGroupAdmin,
};
