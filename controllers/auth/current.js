const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");

const current = async (req, res) => {
  const { name, email } = req.user;
  const user = await User.findOne({ email });
  if (!user) {
    HttpError(401, 'Unauthorized');
  }
  // res.status(200).json(result);
  res.json({user: {
    name,
    email,
  }}
    );
};

module.exports = ctrlWrapper(current);
