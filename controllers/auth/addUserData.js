const { User } = require("../../models/user");

const { HttpError, ctrlWrapper, calculateBMR } = require("../../helpers");


const addUserData = async (req, res) => {
      const { _id } = req.user;
      const updatedData = await User.findOneAndUpdate({ _id }, req.body, {
        new: true,
      }).select('-password');
  
      const { desiredWeight, height, birthday, sex, levelActivity } = updatedData;
  
      const bmr = calculateBMR(
        desiredWeight,
        height,
        birthday,
        sex,
        levelActivity
      );
  
      updatedData.bmr = bmr;
  
      await updatedData.save();
      if (updatedData) {
        res.status(201).json(updatedData);
      } else {
        throw HttpError(404, 'User not found');
      }
  };



  module.exports = ctrlWrapper(addUserData);