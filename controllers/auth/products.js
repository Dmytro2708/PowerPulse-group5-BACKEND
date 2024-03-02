const fs = require("fs").promises;
const path = require("path");

const productsPath = path.resolve("productsCategories.json");

const getProductsCategories = async () => {
  const products = await fs.readFile(productsPath);

  return JSON.parse(products);
};

module.exports = getProductsCategories;
