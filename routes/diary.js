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
  "/addproduct",
  authenticate,
  validateBody(schemasDiary.createDairyProductSchema),
  addProduct
);

diaryRouter.delete(
  "/delproduct",
  authenticate,
  validateBody(schemasDiary.deleteDairyProductSchema),
  deleteProduct
);

diaryRouter.post(
  "/addexercise",
  authenticate,
  validateBody(schemasDiary.createDairyExerciseSchema),
  addExercise
);

diaryRouter.delete(
  "/delexercise",
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

