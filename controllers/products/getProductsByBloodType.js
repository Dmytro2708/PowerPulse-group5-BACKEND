const { ctrlWrapper, HttpError } = require("../../helpers");
const Product = require("../../models/products");

const getProductsByBloodType = async (req, res) => {
  const { title, category, recommended } = req.query;

  const userBloodType = req.user.blood;

  const query = {};
  title && (query.title = { $regex: title, $options: "i" });
  category && (query.category = category);

  if (recommended !== undefined) {
    query[`groupBloodNotAllowed.${userBloodType}`] =
      recommended === "true" ? false : true;
  }
  const filteredProducts = await Product.find(query);

  if (!filteredProducts || filteredProducts.length === 0) {
    throw HttpError(404, "Products not found");
  }

  res.status(200).json({ products: filteredProducts });
};
module.exports = ctrlWrapper(getProductsByBloodType);
