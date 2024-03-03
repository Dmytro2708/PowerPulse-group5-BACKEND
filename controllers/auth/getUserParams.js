const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getUserParams = async (req, res, next) => {
      const { email } = req.user;
      const result = await User.findOne({ email });
      if (!result) {
        HttpError(404, 'Not found');
      }
      res.status(200).json(result);
     };

  module.exports = ctrlWrapper(getUserParams);