const { Schema, model } = require("mongoose");

const { hendleMongooseError } = require("../helpers");

const productSchema = new Schema(
  {
    weight: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    groopBloodNotAllowed: {
      type: {
        1: Boolean,
        2: Boolean,
        3: Boolean,
        4: Boolean,
      },
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
productSchema.post("save", hendleMongooseError);

const Product = model("product", productSchema);

module.exports = Product;
