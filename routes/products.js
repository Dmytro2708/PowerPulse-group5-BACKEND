const express = require("express");

const router = express.Router();

const {
  getProductsCategories,
  getProductsByBloodType,
} = require("../controllers/auth/products");

const { authenticate } = require("../middlewares");

router.get("/", authenticate, getProductsCategories);

router.get("/filters", authenticate, getProductsByBloodType);
module.exports = router;
