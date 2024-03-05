const Joi = require('joi');
const { Schema, model}= require('mongoose');
const handleMongooseError = require('../helpers/hendleMongooseError');

const createDairyExerciseSchema = Joi.object({
    exerciseId: Joi.string().required(), 
    date: Joi.string().regex(/^[0-3][0-9\/[0-1][0-9]\/\d{4}$/).required(), 
    time: Joi.number().min(1).required(),
    calories:Joi.number().min(1).required(),
    
})

const deleteDiaryExerciseSchema = Joi.object({
	id: Joi.string().required(),
    date: Joi.string().regex(/^[0-3][0-9\/[0-1][0-9]\/\d{4}$/).required(), 
})

const createDairyProductSchema = Joi.object({
    productId: Joi.string().required(), 
    date: Joi.string().regex(/^[0-3][0-9\/[0-1][0-9]\/\d{4}$/).required(), 
    amount: Joi.number().min(1).required(),
    calories:Joi.number().min(1).required(),
    
})

const deleteDairyProductSchema = Joi.object({
    id: Joi.string().required(),
    date: Joi.string().regex(/^[0-3][0-9\/[0-1][0-9]\/\d{4}$/).required(), 
  });
  
  const schemasDiary = {
    createDairyExerciseSchema,
    deleteDiaryExerciseSchema,
    createDairyProductSchema,
    deleteDairyProductSchema
  };


const diarySchema= new Schema({

    exerciseId: {
        type: String,
        ref: 'exercise',
   },

    productId: {
        type: String,
        ref: 'product',
   },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },

    date: {
        type: String,
        required: [true, 'Data is required']
    },

    calories: {
        type: Number,
        required: [true, 'Calories is required'],
        default:0,
    },

    time: {
        type: Number,
    },

    amount: {
        type: Number,
        min: 1,
      },

    burnedCalories: {
        type: Number,
          required: true,
          default: 0,
         },

    ExercisesTime: {
            type: Number,
            default: 0
          },

    products: [
            {
             productId: {
                type: String,
                ref: 'product',
               },
              calories: {
                type: Number,
              },
              amount: {
                type: Number,
                type: String,
              },
            },
          ],

    exercises: [
            {            
             exerciseId: {
                type: String,
                ref: 'exercise',
               },
             calories: {
                    type: Number,
                  },
              time: {
                type: Number,
              },
            },
          ],

},{versionKey:false, timestamps:true}) 

diarySchema.post('save', handleMongooseError);

const Diary = model('diary', diarySchema);

module.exports = {schemasDiary, Diary}

