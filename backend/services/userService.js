const User = require("../models/userModel");
const CustomError = require("../utils/customError");

exports.createUser = async (req) => {
  const { name, email, password, picture } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) throw new CustomError(409, "email already exists");
  const user = User.create({
    name,
    email,
    password,
    picture,
  });
  return user;
};

exports.loginUser = async (req) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user?._id) throw new CustomError(401, "Invalid email");
  if (!(await user.matchPassword(password)))
    throw new CustomError(401, "Invalid password");
  return user;
};

exports.getUserDetails = async (userId) => {
  const user = await User.findOne({ _id: userId }, { password: false });
  if (!user?._id) throw new CustomError(404, "user not found");
  return user;
};

exports.findUsers = async (query, userId) => {
  const { search } = query;
  const searchQuery = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};
  return await User.find(searchQuery,{password: false}).find({ _id: { $ne: userId } });
};
