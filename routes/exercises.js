const express = require("express");

const router = express.Router();

const {
  getAllExercises,
  getFiltersByType,
} = require("../controllers/exercises");

const { authenticate } = require("../middlewares");

router.get("/", authenticate, getAllExercises);
router.get("/filters", authenticate, getFiltersByType);
module.exports = router;
