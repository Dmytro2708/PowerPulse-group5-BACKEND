const express = require("express");

const router = express.Router();

const {
  getAllExercises,
  getFilters,
} = require("../controllers/auth/exercises");

const { authenticate } = require("../middlewares");

router.get("/", authenticate, getAllExercises);
router.get("/types", authenticate, getFilters);
module.exports = router;
