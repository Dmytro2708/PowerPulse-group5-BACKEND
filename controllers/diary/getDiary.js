const { ctrlWrapper, HttpError } = require("../../helpers");
const { Diary } = require("../../models/diary");
const { Exercise } = require("../../models/exercises");
const { Product } = require("../../models/products");

const getDiary = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;

  const diaryEntry = await Diary.findOne({ date, owner })
    .populate({
      path: "exercises.exerciseId",
      select: "bodyPart burnedCalories equipment name target",
    })
    .populate({
      path: "products.productId",
      select: "weight category calories title groupBloodNotAllowed",
    });

  if (!diaryEntry) {
    throw HttpError(404, "Dairy entry not found");
  }
  if (!diaryEntry.exercises || !diaryEntry.products) {
    throw HttpError(404, "Dairy entry not found");
  }
  res.status(200).json(diaryEntry);
};

module.exports = ctrlWrapper(getDiary);
