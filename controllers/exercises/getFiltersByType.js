const { HttpError, ctrlWrapper } = require("../../helpers");
const Filter = require("../../models/filters");

const getFiltersByType = async (req, res) => {
  const filterType = req.query.type;
  const filters = await Filter.find({ filter: filterType });
  if (!filters) {
    throw HttpError(404, "Filters not found");
  }
  res.status(200).json(filters);
};
module.exports = ctrlWrapper(getFiltersByType);
