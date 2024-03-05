const express = require("express");

const router = express.Router();

const {
  getProductsCategories,
  getProductsByBloodType,
} = require("../controllers/auth/products");

const { authenticate } = require("../middlewares");

router.get("/categories", authenticate, getProductsCategories);

router.get("/", authenticate, getProductsByBloodType);
module.exports = router;
