const { Schema, model } = require("mongoose");

const { hendleMongooseError } = require("../helpers");

const filtersSchema = new Schema(
  {
    filter: {
      type: String,
    },
    name: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);
filtersSchema.post("save", hendleMongooseError);

const Filter = model("filter", filtersSchema);

module.exports = Filter;
