const express = require("express");

const router = express.Router();

const { getProductsCategories } = require("../controllers/auth");

const { authenticate } = require("../middlewares");

router.get("/", authenticate, getProductsCategories);

module.exports = router;
