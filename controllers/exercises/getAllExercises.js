const { HttpError, ctrlWrapper } = require("../../helpers");
const Exercise = require("../../models/exercises");

const getAllExercises = async (req, res) => {
  const exercises = await Exercise.find();
  if (!exercises) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(exercises);
};
module.exports = ctrlWrapper(getAllExercises);
