const asyncHandler = require("express-async-handler");

const regitserUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword, picture } = req.body;
  if ((!name, !email, !password, !confirmPassword)) {
    res.send();
  }
});

module.exports = {
  regitserUser,
};
