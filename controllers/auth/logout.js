const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, { token: '' });

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ message: "Logout success" });
};

module.exports = ctrlWrapper(logout);
