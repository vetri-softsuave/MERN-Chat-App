const Chat = require("../models/chatModel");
const User = require("../models/userModel");

exports.findIndividualChat = async (userId, otherUserId) => {
  const chat = Chat.find({
    is_group_chat: false,
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: otherUserId } } },
    ],
  })
    .populate("users", { password: false })
    .populate("latest_message");

  return await Chat.populate(chat, {
    path: "latest_message.sender",
    select: "name email picture",
  }); 
};

exports.createChat = async (userId, otherUserId) => {
  const chat = await Chat.create({
    chat_name: "sender",
    is_group_chat: false,
    users: [userId, otherUserId],
  });
  return chat;
};

exports.findChats = async (userId) => {
  let chats = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
    .populate("users", "-password")
    .populate("group_admin", "-password")
    .populate("latest_message")
    .sort({ updatedAt: -1 });

  chats = await User.populate(chats, {
    path: "latest_message.sender",
    select: "name email picture",
  });
  return chats;
};

exports.findChatById = async (chatId, userId) => {
  const chat = Chat.findOne({
    _id: chatId,
    users: { $elemMatch: { $eq: userId } },
  })
    .populate("users", "-password")
    .populate("group_admin", "-password");
  return chat;
};

exports.createNewGroupChat = async (adminUserId, users = [], groupName) => {
  const groupChat = await Chat.create({
    is_group_chat: true,
    chat_name: groupName,
    users: [adminUserId, ...users],
    group_admin: adminUserId,
  });

  return await this.findChatById(groupChat._id);
};

exports.renameGroupChat = async (groupId, groupName) => {
  const updatedChat = await Chat.findByIdAndUpdate(
    groupId,
    { chat_name: groupName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("group_admin", "-password");

  return updatedChat;
};

exports.addUserToGroup = async (groupId, userId) => {
  const updatedChat = await Chat.findByIdAndUpdate(
    groupId,
    { $addToSet: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("group_admin", "-password");

  return updatedChat;
};

exports.removeUserFromGroup = async (groupId, userId) => {
  const updatedChat = await Chat.findByIdAndUpdate(
    groupId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("group_admin", "-password");

  return updatedChat;
};
