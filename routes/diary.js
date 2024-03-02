const express = require("express");

const { addProduct, deleteProduct, addExercise, deleteExercise, getDiary } = require("../controllers/diary");

const { validateBody, authenticate } = require("../middlewares");

const { schemasDiary } = require("../models/diary");

const diaryRouter = express.Router();


diaryRouter.post('/addproduct', (schemasDiary.createDairyProductSchema), addProduct);

diaryRouter.delete('/deleteproduct', deleteProduct);

diaryRouter.post('/addexercise', (schemasDiary.createDairyExerciseSchema), addExercise);

diaryRouter.delete('/deleteexersise', deleteExercise);

diaryRouter.get('/', getDiary);


module.exports = diaryRouter;