const fs = require("fs").promises;
const path = require("path");

const { ctrlWrapper, HttpError } = require("../../helpers");

const productsPath = path.resolve(__dirname, "../../productsCategories.json");

const getProductsCategories = async (req, res) => {
  const products = await fs.readFile(productsPath, "utf8");
  if (!products) {
    throw HttpError(404, "Not found");
  }
  const productList = JSON.parse(products);
  res.json(productList);
};

module.exports = ctrlWrapper(getProductsCategories);
