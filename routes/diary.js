const express = require("express");

const { addProduct, deleteProduct, addExercise, deleteExercise, getDiary } = require("../controllers/diary");

const { validateBody, authenticate } = require("../middlewares");

const { schemasDiary } = require("../models/diary");

const diaryRouter = express.Router();



diaryRouter.post('/addproduct', validateBody(schemasDiary.createDairyProductSchema), addProduct);

diaryRouter.delete('/deleteproduct',validateBody(schemasDiary.deleteDairyProductSchema), deleteProduct);

diaryRouter.post('/addexercise', validateBody(schemasDiary.createDairyExerciseSchema), addExercise);

diaryRouter.delete('/deleteexersise',validateBody(schemasDiary.deleteDiaryExerciseSchema), deleteExercise);

diaryRouter.get('/', getDiary);

module.exports = diaryRouter;