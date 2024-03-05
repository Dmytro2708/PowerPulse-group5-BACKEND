const { ctrlWrapper } = require("../../helpers");
const { Diary } = require("../../models/diary");

const addExercise = async (req, res) => {
    const { _id: owner } = req.user;
    const {
        exerciseId,
        date,
        calories,
        time,
      } = req.body;

      const newExercise = {
        exerciseId,
        calories,
        time,
      };

      const oldExercise = await Diary.findOne({ date, owner });

      if(!oldExercise){
       const newExerciseDiary=await Diary.create({
            owner,
            date,
            burnedCalories: calories,
            ExercisesTime: time,
            exercises: [newExercise]
        });
        res.status(201).json(newExerciseDiary);
      }
      else{
        upDateExercise = await Diary.findOneAndUpdate(
          exerciseId,
            {
              $inc: { burnedCalories: +calories, ExercisesTime: +time }, 
              $push: { exercises: { exerciseId, time, calories } }, 
            },
            {new: true}
          );
          res.status(200).json(upDateExercise);
      }

};
module.exports =  ctrlWrapper(addExercise);

