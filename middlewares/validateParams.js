const HttpError = require("../helpers/HttpError.js");

const validateParams = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate({ date: req.query.date });
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateParams;
