const express = require("express");
const { authenticate } = require("../middlewares/auth");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatController");
const validate = require("../middlewares/validation");
const {
  accessChatSchema,
  createGroupChatSchema,
  renameGroupSchema,
  addToGroupSchema,
  removeFromGroupSchema,
} = require("../config/chatApiRequestSchema");
const { isGroupAdmin } = require("../middlewares/authorization");

const router = express();
router.use(authenticate);

router.get("/", fetchChats);
router.post("/", validate(accessChatSchema), accessChat);
router.post("/group", validate(createGroupChatSchema), createGroupChat);
router.put(
  "/group/rename",
  validate(renameGroupSchema),
  isGroupAdmin,
  renameGroup
);
router.put("/group/add", validate(addToGroupSchema), isGroupAdmin, addToGroup);
router.put(
  "/group/remove",
  validate(removeFromGroupSchema),
  isGroupAdmin,
  removeFromGroup
);

module.exports = router;
