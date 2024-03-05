const express = require("express");

const router = express.Router();

const { getFiltersByType } = require("../controllers/auth/exercises");

const { authenticate } = require("../middlewares");

router.get("/", authenticate, getFiltersByType);
module.exports = router;
