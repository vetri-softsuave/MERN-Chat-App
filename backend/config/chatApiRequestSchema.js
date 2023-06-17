const yup = require("yup");

const accessChatSchema = yup.object({
  receiverUserId: yup.string().required("receiver user id is required"),
});

const createGroupChatSchema = yup.object({
  groupName: yup.string().required("groupName is required"),
  users: yup
    .array()
    .min(1, "atleast add one user")
    .required("users array is required"),
});

const renameGroupSchema = yup.object({
  groupId: yup.string().required("groupId is required"),
  groupName: yup.string().required("groupName is required"),
});

const addToGroupSchema = yup.object({
  groupId: yup.string().required("groupId is required"),
  userToAdd: yup.string().required("userToAdd is required"),
});

const removeFromGroupSchema = yup.object({
  groupId: yup.string().required("groupId is required"),
  userToRemove: yup.string().required("userToRemove is required"),
});

module.exports = {
  accessChatSchema,
  createGroupChatSchema,
  renameGroupSchema,
  addToGroupSchema,
  removeFromGroupSchema,
};