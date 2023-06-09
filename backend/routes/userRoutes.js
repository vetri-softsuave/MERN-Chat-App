const express = require("express");
const validate = require('../utils/validation');
const { signUpSchema } = require('../config/schema')
const { regitserUser } = require("../controllers/userController");
const router = express.Router();

router.post("/signup",validate(signUpSchema),regitserUser);

module.exports = router;
