const { User } = require("../../models/user");

const { HttpError, ctrlWrapper, calculateBMR } = require("../../helpers");


const addUserData = async (req, res) => {
      const { email } = req.user;
      const updatedData = await User.findOneAndUpdate({ email }, req.body, {
        new: true,
      });
  
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
        const responseData = { ...updatedData.toObject(), bmr }
        res.status(201).json(responseData);
      } else {
        throw HttpError(404, 'User not found');
      }
  };



  module.exports = ctrlWrapper(addUserData);