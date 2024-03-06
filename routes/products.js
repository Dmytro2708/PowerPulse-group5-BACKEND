const express = require("express");

const router = express.Router();

const {
  getProductsCategories,
  getProductsByBloodType,
} = require("../controllers/products");

const { authenticate } = require("../middlewares");

router.get("/categories", authenticate, getProductsCategories);

router.get("/", authenticate, getProductsByBloodType);
module.exports = router;
