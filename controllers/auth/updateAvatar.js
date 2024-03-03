const path = require("path");
const fs = require("fs/promises");

const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = req.file.path;
  await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  res.json({
    avatarURL,
  });
};

module.exports = ctrlWrapper(updateAvatar);
