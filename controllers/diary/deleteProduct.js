const { ctrlWrapper, HttpError } = require("../../helpers");
const { Diary } = require("../../models/diary");

const deleteProduct = async (req, res) => {
  const { productId, date } = req.body;
  const { _id: owner } = req.user;

  const userFind = await Diary.findOne({ owner, date });

  if (!userFind) {
    throw HttpError(404);
  }

  const productIndex = userFind.products.findIndex(
    (product) => product.productId.toString() === productId
  );

  if (productIndex === -1) {
    throw HttpError(404);
  } else {
    const product = userFind.products[productIndex];
    await Diary.findOneAndUpdate(
      { owner, date },
      {
        $inc: { Calories: -product.calories, amountAll: -product.amount },
        $pull: { products: { productId: product.productId } },
      },
      { new: true }
    );

    res.status(200).json({ message: "Product deleted" });
  }

};

module.exports = ctrlWrapper(deleteProduct);
