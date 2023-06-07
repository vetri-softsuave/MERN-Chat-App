const mongoose = require("mongoose");

const modelSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, require: true },
    email: { type: String, trim: true, require: true },
    password: { type: String, trim: true, require: true },
    picture: {
      type: String,
      require: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", modelSchema);
