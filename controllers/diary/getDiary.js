const { ctrlWrapper, HttpError } = require("../../helpers");
const { Diary } = require("../../models/diary");
const {Exercise} = require("../../models/exercises");
const {Product} = require("../../models/products");

const getDiary = async (req, res) => {
    const {_id: owner} = req.user;
    const {data} = req.query;

    userFind = await Diary.findOne({data, owner});
    if(!userFind){
        throw HttpError(404)
    }


    resultExercises = await Diary.find().populate("exercises.exerciseId", "bodyPart equipment name target burnedCalories time" );
    resultProducts = await Diary.find().populate("products.productId", "weight calories category title");

    infoUserProdactsExercises = {
       owner: userFind.owner,
       data: userFind.data,
       burnedCalories: userFind.burnedCalories,
       ExercisesTime: userFind.ExercisesTime,
       exercises: [...resultExercises],
       products: [...resultProducts]
}
res.status(201).json(infoUserProdactsExercises);
};

module.exports = ctrlWrapper(getDiary);