import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      default: 0,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    accessRights: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
