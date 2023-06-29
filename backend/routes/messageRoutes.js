const express = require("express");
const { authenticate } = require("../middlewares/auth");
const validate = require("../middlewares/validation");
const {
  sendMessageSchema,
  getAllMessagesFromChatSchema,
} = require("../config/chatApiRequestSchema");
const {
  sendMessage,
  getAllMessagesFromChat,
} = require("../controllers/messageController");
const { paramsToBody } = require("../utils/helper");

const router = express.Router();

router.use(authenticate);
router.post("/", validate(sendMessageSchema), sendMessage);
router.get(
  "/:chatId",
  paramsToBody,
  validate(getAllMessagesFromChatSchema),
  getAllMessagesFromChat
);

module.exports = router;
