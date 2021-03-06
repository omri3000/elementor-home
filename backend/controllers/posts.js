import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const postMessages = await PostMessage.find({ creator: userId })
      .sort({
        createdAt: "desc",
      })
      .exec();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res, next) => {
  const post = req.body;

  const newPost = new PostMessage(post);
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};
