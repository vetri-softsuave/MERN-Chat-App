const { findChatById } = require("../services/chatService");
const {
  addMessage,
  findAllMessagesForChat,
} = require("../services/messageService");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const checkValidObjectId = require("../utils/mongoose");

const sendMessage = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { content, chatId } = req.body;
  checkValidObjectId({ chatId });
  const chatExists = await findChatById(chatId, userId);
  if (!chatExists._id) throw new CustomError(400, "Chat not found");
  const message = await addMessage(chatId, userId, content);
  if (!message?._id) throw new CustomError(500, "something went wrong");
  res.send({ message });
});

const getAllMessagesFromChat = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { chatId } = req.params;
  checkValidObjectId({ chatId });
  const chatExists = await findChatById(chatId, userId);
  if (!chatExists?._id) throw new CustomError(400, "chat not found");
  const messages = await findAllMessagesForChat(chatId);
  if (messages?.length <= 0) res.status(204).send([]);
  else res.send({ messages });
});

module.exports = {
  sendMessage,
  getAllMessagesFromChat,
};
