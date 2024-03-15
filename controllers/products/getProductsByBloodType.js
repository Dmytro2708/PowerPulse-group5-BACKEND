const { ctrlWrapper, HttpError } = require("../../helpers");
const Product = require("../../models/products");

const getProductsByBloodType = async (req, res) => {
  const { title, category, recommended } = req.query;

  const userBloodType = req.user.blood;

  const filters = {};
  if (title) filters.title = { $regex: title, $options: "i" };
  if (category) filters.category = category;

  if (recommended !== undefined) {
    filters[`groupBloodNotAllowed.${userBloodType}`] =
      recommended === "true" ? false : true;
  }
  const filteredProducts = await Product.find(filters);

  if (!filteredProducts || filteredProducts.length === 0) {
    return res.status(200).json({ products: [] });
  }

  res.status(200).json({ products: filteredProducts });
};
module.exports = ctrlWrapper(getProductsByBloodType);
