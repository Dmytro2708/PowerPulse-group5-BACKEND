const { ctrlWrapper, HttpError } = require("../../helpers");
const { Diary } = require("../../models/diary");
const { Exercise } = require("../../models/exercises");
const { Product } = require("../../models/products");

const getDiary = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.body;

  const userFind = await Diary.findOne({ date, owner });
  if (!userFind) {
    throw HttpError(404);
  } else {
   
    const resultExercises = await Diary.find({ date, owner }, '-products -amountAll -Calories')
      .populate(
         "exercises.exerciseId",
         "bodyPart equipment name target",
      );


    const resultProducts = await Diary.find({ date, owner }, '-exercises -burnedCalories -ExercisesTime' )
      .populate(
        "products.productId",
        "weight category title groupBloodNotAllowed"
      );

    const infoUserProdactsExercises = {
      exercises: resultExercises,
      products: resultProducts,
    };
    res.status(201).json(infoUserProdactsExercises);
  }
};

module.exports = ctrlWrapper(getDiary);
