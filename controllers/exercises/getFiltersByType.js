const { HttpError, ctrlWrapper } = require("../../helpers");
const Filter = require("../../models/filters");

const getFiltersByType = async (req, res) => {
  const { filter, value } = req.query;

  if (!filter || !value) {
    throw HttpError(400, "Missing filter parameter");
  }

  let filters;
  switch (filter) {
    case "Body parts":
    case "Muscles":
    case "Equipment":
      filters = await Filter.find({ name: value, filter: filter });
      break;
    default:
      throw HttpError(400, "Invalid filter parameter");
  }

  if (!filters || filters.length === 0) {
    throw HttpError(404, "Filters not found");
  }

  res.status(200).json(filters);
};
module.exports = ctrlWrapper(getFiltersByType);
