const { ctrlWrapper, HttpError } = require("../../helpers");
const Product = require("../../models/products");

const getProductsByBloodType = async (req, res) => {
  const userBloodType = req.user.blood;

  const allProducts = await Product.find({}); // Отримати всі продукти

  if (!allProducts) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ products: allProducts });
};
module.exports = ctrlWrapper(getProductsByBloodType);
