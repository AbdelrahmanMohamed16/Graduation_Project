const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const user = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  type: {
    type: String,
    enum: {
      values: ["محرر", "مدقق", "مقرر"],
      message: "نوع المستخدم يجب ان يكون مقرر او محرر او مدقق",
    },
  },
  username: {
    type: String,
    required: true,
  },
  // TODO
  //    HASH password
  password: {
    type: String,
    required: true,
  },
  committee: {
    type: String,
    required: true,
  },
  supervised: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  words: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Word",
    },
  ],
});

user.methods.comparePassword = async (_password) => {
  console.log(`my pass is => ${this.password}`);
  return await bcrypt.compare(_password, this.password);
};

// user.pre("save", async (next) => {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, process.env.HASH_SALT);
//   }
//   next();
// });

const User = new mongoose.model("User", user);
module.exports = User;
