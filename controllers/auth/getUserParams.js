const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getUserParams = async (req, res, next) => {
      const { _id } = req.user;
      const result = await User.findOne({ _id }).select('-password');
      if (!result) {
        HttpError(404, 'Not found');
      }
      res.status(200).json(result);
     };

  module.exports = ctrlWrapper(getUserParams);