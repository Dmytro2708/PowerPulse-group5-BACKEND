const { HttpError, ctrlWrapper } = require("../../helpers");
const Exercise = require("../../models/exercises");

const getAllExercises = async (req, res) => {
  const { filter, value } = req.query;

  if (!filter || !value) {
    throw HttpError(400, "Missing filter parameter");
  }

  // let exercises;
  // switch (filter) {
  //   case "bodyPart":
  //     exercises = await Exercise.find({ bodyPart: value });
  //     break;
  //   // case "muscles":
  //   //   exercises = await Exercise.find({ muscles: value });
  //   //   break;
  //   case "equipment":
  //     exercises = await Exercise.find({ equipment: value });
  //     break;
  //   default:
  //     return res.status(400).json({ message: "Invalid filter parameter" });
  // }
  const exercises = await Exercise.find({ [filter]: value });
  if (!exercises || exercises.length === 0) {
    throw HttpError(404, "Exercises not found");
  }

  res.status(200).json(exercises);
};
module.exports = ctrlWrapper(getAllExercises);
