const register = require("./register");
const login = require("./login");
const current = require("./current");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");
const getProductsCategories = require("./products");
const getAllExercises = require("./exercises");
const getFilters = require("./exercises");
module.exports = {
  register,
  login,
  current,
  logout,
  updateAvatar,
  getProductsCategories,
  getAllExercises,
  getFilters,
};
