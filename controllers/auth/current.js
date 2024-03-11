const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");

const current = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne({ _id }).select('-password');
     res.json(user);
};

module.exports = ctrlWrapper(current);
