import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      res
        .status(401)
        .json({ success: false, error: "Not authorized to access this route" })
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      res
        .status(404)
        .json({ success: false, error: "No user found with this ID" });
    }

    req.user = user;

    next();
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Not authorized to access this route" });
  }
};
