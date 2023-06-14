const { createUser, loginUser, getUserDetails } = require("../services/userService");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const generateToken = require("../utils/jwt");

const regitserUser = asyncHandler(async (req, res) => {
  const result = await createUser(req);
  if (result?._id)
    res.status(200).send({
      message: "User registered successfully",
      accessToken: generateToken(result?._id),
    });
  else throw new CustomError(400, "Registration failed");
});

const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req);
  if (result?._id)
    res.status(200).send({
      message: "login successfull",
      accessToken: generateToken(result?._id),
    });
  else throw new CustomError(400, "Login failed");
});

const getUser = asyncHandler(async (req, res) => {
  const {userId} = req.body;
  const result = await getUserDetails(userId);
  if(result?._id) res.status(200).send({user:result})
  else throw new CustomError(400, "Cannot get user details")
})
module.exports = {
  regitserUser,
  login,
  getUser
};
