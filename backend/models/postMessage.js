import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: String,
    message: String,
    creator: {
      type: String,
      required: [true, "Please provide a creator"],
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const PostMessage = mongoose.model("PostMessage", PostSchema);

export default PostMessage;
