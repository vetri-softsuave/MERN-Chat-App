const express = require("express");
const { getUser } = require("../controllers/userController");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();

router.use(authenticate);
router.get("/", getUser);

module.exports = router;
