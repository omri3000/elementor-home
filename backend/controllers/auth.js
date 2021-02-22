import User from "../models/user.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      res
        .status(400)
        .json({ success: false, error: "Please provide email and password" })
    );
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(
        res.status(404).json({ success: false, error: "Invalid credentials" })
      );
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(
        res.status(404).json({ success: false, error: "Invalid credentials" })
      );
    }

    sendToken(user, 200, res);
  } catch (error) {
    return next(res.status(500).json({ success: false, error: error.message }));
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getToken();
  res
    .status(statusCode)
    .json({ success: true, token, username: user.username, id: user._id });
};
