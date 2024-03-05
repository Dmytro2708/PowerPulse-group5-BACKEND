const { ctrlWrapper, HttpError} = require("../../helpers");
const { Diary } = require("../../models/diary");

const deleteProduct = async (req, res) => {
const {productId, data} = req.query;
const {_id: owner} = req.user;

const userFind = await Diary.findOne({owner, data});

if(!userFind){
   throw HttpError(404)
}

const product = userFind.products.find(product=>product._id===productId);

if(!product){
    throw HttpError(404)
}
else{
    await Diary.findByIdAndDelete(_id, {
        $inc: { burnedCalories: -products.calories, amount: -amount },
        $pull: { products: { _id: productId } },
    });

    res.status(200).json({message: "Product delete"})
}
};

module.exports =ctrlWrapper(deleteProduct);
