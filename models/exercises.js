const { Schema, model } = require("mongoose");

const { hendleMongooseError } = require("../helpers");

const exerciseSchema = new Schema(
  {
    bodyPart: {
      type: String,
    },
    equipment: {
      type: String,
    },
    gifUrl: {
      type: String,
    },
    name: {
      type: String,
    },
    burnedCalories: {
      type: Number,
    },
    time: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);
exerciseSchema.post("save", hendleMongooseError);

const Exercise = model("exercise", exerciseSchema);

module.exports = Exercise;
