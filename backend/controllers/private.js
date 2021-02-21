export const getPrivateData = (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    user,
    data: "You got access to the private data in this route",
  });
};
