const fs = require("fs").promises;
const path = require("path");

const { ctrlWrapper, HttpError } = require("../../helpers");
const Product = require("../../models/products");

const productsPath = path.resolve(__dirname, "../../productsCategories.json");


const getProductsCategories = async (req, res) => {
  const products = await fs.readFile(productsPath, "utf8");
  if (!products) {
    throw HttpError(404, "Not found");
  }
  const productList = JSON.parse(products);
  res.json(productList);

};

const getProductsByBloodType = async (req, res) => {
  const userBloodType = req.user.blood;

  const allowedProducts = await Product.find({
    [`groupBloodNotAllowed.${userBloodType}`]: false,
  });
  const disallowedProducts = await Product.find({
    [`groupBloodNotAllowed.${userBloodType}`]: true,
  });
  if (!allowedProducts || !disallowedProducts) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ allowedProducts, disallowedProducts });
};

module.exports = {
  getProductsCategories: ctrlWrapper(getProductsCategories),
  getProductsByBloodType: ctrlWrapper(getProductsByBloodType),
};
