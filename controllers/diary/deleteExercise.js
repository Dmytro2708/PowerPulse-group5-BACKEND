const { ctrlWrapper, HttpError} = require("../../helpers");
const { Diary } = require("../../models/diary");

const deleteExercise = async (req, res) => {
const {exerciseId, date} = req.body;
const {_id: owner} = req.user;

const userFind = await Diary.findOne({owner, date});

if(!userFind){
   throw HttpError(404)
}

const exercise = userFind.exercises.find(exercise=>exercise.exerciseId===exerciseId);

if(!exercise){
    throw HttpError(404)
}
else{
    await Diary.findOneAndDelete(exerciseId, {
        $inc: { burnedCalories: -userFind.exercises.calories, ExercisesTime: -userFind.exercises.time },
        $pull: { exercises: { exerciseId: exerciseId } },
    });

    res.status(200).json({message: "Exercise delete"})
}
};

module.exports = ctrlWrapper(deleteExercise);

