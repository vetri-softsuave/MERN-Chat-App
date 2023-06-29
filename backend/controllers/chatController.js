const { isValidObjectId } = require("mongoose");
const {
  createChat,
  findIndividualChat,
  findChats,
  createNewGroupChat,
  renameGroupChat,
  addUserToGroup,
  findChatById,
  removeUserFromGroup,
} = require("../services/chatService");
const { getUserDetails } = require("../services/userService");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const checkValidObjectId = require("../utils/mongoose");

const accessChat = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const receiverUserId = req.body.receiverUserId;
  checkValidObjectId({ receiverUserId });
  let chat = await findIndividualChat(userId, receiverUserId);
  if (!chat || chat?.length <= 0) {
    await createChat(userId, receiverUserId);
    chat = await findIndividualChat(userId, receiverUserId);
  }
  res.send({ chat: chat[0] });
});

const fetchChats = asyncHandler(async (req, res) => {
  const chats = await findChats(req?.userId);
  if (!chats || chats?.length <= 0) res.status(204).send([]);
  else res.send(chats);
});

const createGroupChat = asyncHandler(async (req, res) => {
  const { userId, users, groupName } = req.body;
  for (let userId of users) {
    checkValidObjectId({ userId });
  }
  const chat = await createNewGroupChat(userId, users, groupName);
  if (!chat?._id)
    throw new CustomError(500, "cannot create group, try again later");
  else res.send(chat);
});

const renameGroup = asyncHandler(async (req, res) => {
  const { groupId, groupName } = req.body;
  checkValidObjectId({ groupId });
  const groupExists = await findChatById(groupId, req.userId);
  if (!groupExists._id) throw new CustomError(400, "Group Not Found");
  const chat = await renameGroupChat(groupId, groupName);
  if (!chat?._id)
    throw new CustomError(500, "cannot rename group, try again later");
  else res.send(chat);
});

const addToGroup = asyncHandler(async (req, res) => {
  const { groupId, userToAdd } = req.body;
  checkValidObjectId({ groupId });
  checkValidObjectId({ userToAdd });
  const groupExists = await findChatById(groupId, req.userId);
  if (!groupExists._id) throw new CustomError(400, "Group Not Found");
  const userExists = await getUserDetails(userToAdd);
  if (!userExists._id) throw new CustomError(400, "user not found");
  const chat = await addUserToGroup(groupId, userToAdd);
  if (!chat?._id)
    throw new CustomError(500, "cannot rename group, try again later");
  else res.send(chat);
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { groupId, userToRemove } = req.body;
  checkValidObjectId({ groupId });
  checkValidObjectId({ userToRemove });
  const groupExists = await findChatById(groupId, req.userId);
  if (!groupExists._id) throw new CustomError(400, "Group Not Found");
  const userExists = await getUserDetails(userToRemove);
  if (!userExists._id) throw new CustomError(400, "user not found");
  const chat = await removeUserFromGroup(groupId, userToRemove);
  if (!chat?._id)
    throw new CustomError(500, "cannot rename group, try again later");
  else res.send(chat);
});

const leaveGroup = async (req, res) => {
  const { userId, groupId } = req.body;
  checkValidObjectId({ groupId });
  const groupExists = await findChatById(groupId, req.userId);
  if (!groupExists?._id) throw new CustomError(400, "Group not found");
  const chat = await removeUserFromGroup(groupId, userId);
  if (!chat._id) throw new CustomError(500, "something went wrong");
  res.send({ message: "successfully removed from group" });
};

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  leaveGroup,
};
