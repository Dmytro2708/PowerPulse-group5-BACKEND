const { ctrlWrapper, HttpError} = require("../../helpers");
const { Diary } = require("../../models/diary");

const deleteExercise = async (req, res) => {
const {exerciseId, data} = req.query;
const {_id: owner} = req.user;

const userFind = await Diary.findOne({owner, data});

if(!userFind){
   throw HttpError(404)
}

const exercise = userFind.exercises.find(exercise=>exercise._id===exerciseId);

if(!exercise){
    throw HttpError(404)
}
else{
    await Diary.findByIdAndDelete(_id, {
        $inc: { burnedCalories: -exercises.calories, ExercisesTime: -time },
        $pull: { exercises: { _id: exerciseId } },
    });

    res.status(200).json({message: "Exercise delete"})
}
};

module.exports = ctrlWrapper(deleteExercise);

