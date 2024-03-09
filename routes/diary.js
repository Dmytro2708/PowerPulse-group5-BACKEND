const express = require("express");

const {
  addProduct,
  deleteProduct,
  addExercise,
  deleteExercise,
  getDiary,
} = require("../controllers/diary");

const {
  validateBody,
  authenticate,
  validateParams,
} = require("../middlewares");

const { schemasDiary } = require("../models/diary");

const diaryRouter = express.Router();

diaryRouter.post(
  "/product",
  authenticate,
  validateBody(schemasDiary.createDairyProductSchema),
  addProduct
);

diaryRouter.delete(
  "/product",
  authenticate,
  validateBody(schemasDiary.deleteDairyProductSchema),
  deleteProduct
);

diaryRouter.post(
  "/exercise",
  authenticate,
  validateBody(schemasDiary.createDairyExerciseSchema),
  addExercise
);

diaryRouter.delete(
  "/exercise",
  authenticate,
  validateBody(schemasDiary.deleteDiaryExerciseSchema),
  deleteExercise
);

diaryRouter.get(
  "/",
  authenticate,
  validateParams(schemasDiary.getDairySchema),
  getDiary
);

module.exports = diaryRouter;

