const express = require("express");
const validate = require("../middlewares/validation");
const { signUpSchema, loginSchema } = require("../config/schema");
const {
  regitserUser,
  login,
  getUser,
} = require("../controllers/userController");
const authenticate = require("../middlewares/auth");
const router = express.Router();

router.get("/", authenticate, getUser);
router.post("/signup", validate(signUpSchema), regitserUser);
router.post("/login", validate(loginSchema), login);

module.exports = router;
