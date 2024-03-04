const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = req.file.path;
  await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  res.json({
    avatarURL,
  });
};

module.exports = ctrlWrapper(updateAvatar);
