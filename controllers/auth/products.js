const fs = require("fs").promises;
const path = require("path");

const { ctrlWrapper } = require("../../helpers");
const Product = require("../../models/products");

const productsPath = path.resolve("productsCategories.json");

const getProductsCategories = async () => {
  const products = await fs.readFile(productsPath);

  return JSON.parse(products);
};
// getProductsCategories()
//   .then((products) => console.log(products))
//   .catch((error) => console.error(error));
// console.log("Request received to getProductsCategories");
const getProductsByBloodType = async (req, res) => {
  const userBloodType = req.user.bloodType;
  const allowedProducts = await Product.find({
    groupBloodNotAllowed: { [userBloodType]: true },
  });
  const disallowedProducts = await Product.find({
    groupBloodNotAllowed: { [userBloodType]: false },
  });
  res.json({ allowedProducts, disallowedProducts });
};

module.exports = {
  getProductsCategories: ctrlWrapper(getProductsCategories),
  getProductsByBloodType: ctrlWrapper(getProductsByBloodType),
};
