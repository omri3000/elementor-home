import mongoose from "mongoose";
import bgcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    resetPasswordToken: String,
  },
  { collation: "users" }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bgcrypt.genSalt(10);
  this.password = await bgcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (pass) {
  return await bgcrypt.compare(pass, this.password);
};

UserSchema.methods.getToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", UserSchema);

export default User;
