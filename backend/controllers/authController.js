const {
  createUser,
  loginUser,
  getUserDetails,
} = require("../services/userService");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const regitserUser = asyncHandler(async (req, res) => {
  const result = await createUser(req);
  if (result?._id) {
    const refreshToken = await generateRefreshToken(result?._id);
    const accessToken = await generateAccessToken(result?._id);
    res.cookie("jwt", refreshToken);
    res.status(200).send({
      message: "User registered successfully",
      accessToken: accessToken,
    });
  } else throw new CustomError(400, "Registration failed");
});

const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req);
  if (result?._id) {
    const refreshToken = await generateRefreshToken(result?._id);
    const accessToken = await generateAccessToken(result?._id);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
    });
    res.status(200).send({
      message: "login successfull",
      accessToken: accessToken,
    });
  } else throw new CustomError(400, "Login failed");
});

const refreshToken = asyncHandler(async (req, res) => {
  const result = await getUserDetails(req.userId);
  if (result?._id) {
    const accessToken = await generateAccessToken(result?._id);
    res.status(200).send({
      message: "refresh token verified",
      accessToken,
    });
  } else throw new CustomError(401, "token expired, login again");
});

const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.status(204);
  res.clearCookie("jwt", { httpOnly: true });
  res.status(200).send({
    message: "cookies cleared",
  });
});

module.exports = {
  regitserUser,
  login,
  refreshToken,
  logout,
};
