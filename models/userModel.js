import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = new mongoose.model("User", userSchema);

export default User;
