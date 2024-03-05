const { ctrlWrapper, HttpError } = require("../../helpers");
const Product = require("../../models/products");
const getProductsByBloodType = async (req, res) => {
  const userBloodType = req.user.blood;

  const allowedProducts = await Product.find({
    [`groupBloodNotAllowed.${userBloodType}`]: false,
  });
  const disallowedProducts = await Product.find({
    [`groupBloodNotAllowed.${userBloodType}`]: true,
  });
  if (!allowedProducts || !disallowedProducts) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ allowedProducts, disallowedProducts });
};
module.exports = ctrlWrapper(getProductsByBloodType);
