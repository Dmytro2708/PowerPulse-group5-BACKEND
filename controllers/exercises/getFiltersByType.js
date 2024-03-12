const { HttpError, ctrlWrapper } = require("../../helpers");
const Filter = require("../../models/filters");

const getFiltersByType = async (req, res) => {
  const filters = await Filter.find({});
  if (!filters || filters.length === 0) {
    throw HttpError(404, "Filters not found");
  }

  res.status(200).json(filters);
};
module.exports = ctrlWrapper(getFiltersByType);
