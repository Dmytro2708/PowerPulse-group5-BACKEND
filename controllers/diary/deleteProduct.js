const { ctrlWrapper, HttpError} = require("../../helpers");
const { Diary } = require("../../models/diary");

const deleteProduct = async (req, res) => {
const {productId, date} = req.body;
const {_id: owner} = req.user;

const userFind = await Diary.findOne({ date, owner });

if(!userFind){
   throw HttpError(404)
}

const product = userFind.products.find(product=>product.productId===productId);

if(!product){
    throw HttpError(404)
}
else{
    await Diary.findOneAndDelete(productId, {
        $inc: { Calories: -userFind.products.calories, amountAll: -userFind.products.amount },
        $pull: { products: { productId: productId } },
    });

    res.status(200).json({message: "Product delete"})
}
};

module.exports =ctrlWrapper(deleteProduct);
