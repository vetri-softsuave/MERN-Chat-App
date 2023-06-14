const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const modelSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, require: true },
    email: { type: String, trim: true, require: true, unique: true},
    password: { type: String, trim: true, require: true },
    picture: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

modelSchema.methods.matchPassword = async function (enterredPassword){
  return bcrypt.compare(enterredPassword, this.password)
}

modelSchema.pre("save", async function (next){
  if(!this.isModified) next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
module.exports = mongoose.model("User", modelSchema);
