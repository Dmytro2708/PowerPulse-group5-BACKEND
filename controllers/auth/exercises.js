const { HttpError, ctrlWrapper } = require("../../helpers");
const Exercise = require("../../models/exercises");
const Filter = require("../../models/filters");
const getAllExercises = async (req, res) => {
  const exercises = await Exercise.find();
  if (!exercises) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(exercises);
};
const getFiltersByType = async (req, res) => {
  const filterType = req.query.type;
  const filters = await Filter.find({ filter: filterType });
  if (!filters) {
    throw HttpError(404, "Filters not found");
  }
  res.status(200).json(filters);
};
module.exports = {
  getAllExercises: ctrlWrapper(getAllExercises),
  getFiltersByType: ctrlWrapper(getFiltersByType),
};
