const express = require("express");

const { addProduct, deleteProduct, addExercise, deleteExercise, getDiary } = require("../controllers/diary");

const { validateBody, authenticate } = require("../middlewares");

const { schemasDiary } = require("../models/diary");

const diaryRouter = express.Router();



diaryRouter.post('/diary/product', authenticate, validateBody(schemasDiary.createDairyProductSchema), addProduct);

diaryRouter.delete('/diary/product', authenticate, validateBody(schemasDiary.deleteDairyProductSchema), deleteProduct);

diaryRouter.post('/diary/exercise', authenticate, validateBody(schemasDiary.createDairyExerciseSchema), addExercise);

diaryRouter.delete('/diary/exersise',authenticate, validateBody(schemasDiary.deleteDiaryExerciseSchema), deleteExercise);

diaryRouter.get('/diary', authenticate, validateBody(schemasDiary.getDairySchema), getDiary);

module.exports = diaryRouter;