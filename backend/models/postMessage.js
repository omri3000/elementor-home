import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Created dynamically Schema can be all types and can expand
// PromotionName,Type,StartDate,EndDate,UserGroupName
const PostSchema = new Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  likeCount: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", PostSchema);

export default PostMessage;
