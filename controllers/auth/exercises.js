const { HttpError, ctrlWrapper } = require("../../helpers");
const Exercise = require("../../models/exercises");
const Filter = require("../../models/filters");
const getAllExercises = async (req, res) => {
  const exercises = await Exercise.find();
  res.json(exercises);
};
const getFilters = async (req, res) => {
  const filters = await Filter.find();
  res.json(filters);
};
module.exports = {
  getAllExercises: ctrlWrapper(getAllExercises),
  getFilters: ctrlWrapper(getFilters),
};
