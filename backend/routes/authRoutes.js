const express = require("express");
const validate = require("../middlewares/validation");
const { signUpSchema, loginSchema } = require("../config/schema");
const {
  regitserUser,
  login,
  refreshToken,
  logout,
} = require("../controllers/authController");
const { verifyRefreshToken } = require("../middlewares/auth");
const router = express.Router();

router.post("/", validate(loginSchema), login);
router.post("/signup", validate(signUpSchema), regitserUser);
router.get("/refresh", verifyRefreshToken, refreshToken);
router.post("/logout", logout);

module.exports = router;
