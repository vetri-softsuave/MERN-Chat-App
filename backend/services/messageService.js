const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

exports.addMessage = async (chatId, senderId, content) => {
  let message = await Message.create({
    chat: chatId,
    sender: senderId,
    content: content,
  });
  message = await message.populate("sender", "name picture");
  message = await message.populate("chat");
  message = await User.populate(message, {
    path: "chat.users",
    select: "name picture email",
  });
  await Chat.findByIdAndUpdate(chatId, {
    latest_message: message,
  });
  return message;
};

exports.findAllMessagesForChat = async (chatId) => {
  const messages = await Message.find({ chat: chatId })
    .populate("sender", "name email picture")
    .populate("chat");
  return messages;
};
