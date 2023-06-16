const express = require("express");
const { getUser, searchUsers } = require("../controllers/userController");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();

router.use(authenticate);
router.get("/", getUser);
router.get("/all", searchUsers);

module.exports = router;
