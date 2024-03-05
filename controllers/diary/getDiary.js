const { ctrlWrapper, HttpError } = require("../../helpers");
const { Diary } = require("../../models/diary");
const {Exercise} = require("../../models/exercises");
const {Product} = require("../../models/products");

const getDiary = async (req, res) => {
    const {_id: owner} = req.user;
    const {data} = req.body;

    const userFind = await Diary.findOne({data, owner});
    if(!userFind){
        throw HttpError(404)
    }


    const resultExercises = await Diary.find().populate("exerciseId");
  
    const resultProducts = await Diary.find().populate("productId");
    

   const infoUserProdactsExercises = {
       exercises: [...resultExercises],
       products: [...resultProducts]
}
res.status(201).json(infoUserProdactsExercises);
};

module.exports = ctrlWrapper(getDiary);