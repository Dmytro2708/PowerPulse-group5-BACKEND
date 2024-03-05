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
const getFilters = async (req, res) => {
  const filters = await Filter.find();
  if (!filter) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(filters);
};
module.exports = {
  getAllExercises: ctrlWrapper(getAllExercises),
  getFilters: ctrlWrapper(getFilters),
};
