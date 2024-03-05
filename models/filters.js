const { Schema, model } = require("mongoose");

const { hendleMongooseError } = require("../helpers");

const filtersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  filter: {
    type: String,
    enum: ["Body parts", "Muscles", "Equipment"],
    required: true,
  },

  imgUrl: {
    type: String,
    required: true,
  },
});
filtersSchema.post("save", hendleMongooseError);

const Filter = model("filter", filtersSchema);

module.exports = Filter;
