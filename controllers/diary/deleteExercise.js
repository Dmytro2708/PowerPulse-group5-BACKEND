const { ctrlWrapper, HttpError } = require("../../helpers");
const { Diary } = require("../../models/diary");

const deleteExercise = async (req, res) => {
  const { exerciseId, date } = req.body;
  const { _id: owner } = req.user;

  const userFind = await Diary.findOne({ owner, date });

  if (!userFind) {
    throw HttpError(404);
  }

  const exerciseIndex = userFind.exercises.findIndex(
    (exercise) => exercise.exerciseId.toString() === exerciseId
  );

  if (exerciseIndex === -1) {
    throw HttpError(404);
  } else {
    const exercise = userFind.exercises[exerciseIndex];
    await Diary.findOneAndUpdate(
      { owner, date },
      {
        $inc: {
          burnedCalories: -exercise.calories,
          ExercisesTime: -exercise.time,
        },
        $pull: { exercises: { exerciseId: exercise.exerciseId } },
      },
      { new: true }
    );

    res.status(200).json({ message: "Exercise deleted" });
  }
};

module.exports = ctrlWrapper(deleteExercise);
