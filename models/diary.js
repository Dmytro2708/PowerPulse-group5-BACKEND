const Joi = require('joi');
const { Schema, model}= require('mongoose');
const handleMongooseError = require('../helpers/hendleMongooseError');
const dateRegex = require('./pattern');


const createDairyExerciseSchema = Joi.object({
    exerciseId: Joi.string().required().messages({
      'string.base': 'The exerciseId must be a string.',
      'any.required': 'The exerciseId field is required.'
    }),  
    date: Joi.string().regex(dateRegex).required().messages({
      'string.base': 'The date must be a string.',
      'any.required': 'The date field is required.',
      'string.regex.base': 'The date must be in format dd/mm/yyyy',
    }), 
    time: Joi.number().min(1).required().messages({
      'number.base': 'The time must be a number.',
      'any.required': 'The time field is required.'
    }),
    calories:Joi.number().min(1).required().messages({
      'number.base': 'The calories must be a number.',
      'any.required': 'The calories field is required.'
    }),
    
})

const deleteDiaryExerciseSchema = Joi.object({
	  exerciseId: Joi.string().required().messages({
      'string.base': 'The exerciseId must be a string.',
      'any.required': 'The exerciseId field is required.'
    }),  
    date: Joi.string().regex(dateRegex).required().messages({
      'string.base': 'The date must be a string.',
      'any.required': 'The date field is required.',
      'string.regex.base': 'The date must be in format dd/mm/yyyy',
    }), 
})

const createDairyProductSchema = Joi.object({
    productId: Joi.string().required().messages({
      'string.base': 'The productId must be a string.',
      'any.required': 'The productId field is required.'
    }),  
    date: Joi.string().regex(dateRegex).required().messages({
      'string.base': 'The date must be a string.',
      'any.required': 'The date field is required.',
      'string.regex.base': 'The date must be in format dd/mm/yyyy',
    }), 
    amount: Joi.number().min(1).required().messages({
      'number.base': 'The amount must be a number.',
      'any.required': 'The amount field is required.'
    }),
    calories:Joi.number().min(1).required().messages({
      'number.base': 'The calories must be a number.',
      'any.required': 'The calories field is required.'
    }),
    
})

const deleteDairyProductSchema = Joi.object({
    productId: Joi.string().required().messages({
      'string.base': 'The productId must be a string.',
      'any.required': 'The productId field is required.'
    }),  
    date: Joi.string().regex(dateRegex).required().messages({
      'string.base': 'The date must be a string.',
      'any.required': 'The date field is required.',
      'string.regex.base': 'The date must be in format dd/mm/yyyy',
    }),  
  });

  const getDairySchema = Joi.object({
    date: Joi.string().regex(dateRegex).required().messages({
      'string.base': 'The date must be a string.',
      'any.required': 'The date field is required.',
      'string.regex.base': 'The date must be in format dd/mm/yyyy',
    }),  
  });
  
  const schemasDiary = {
    createDairyExerciseSchema,
    deleteDiaryExerciseSchema,
    createDairyProductSchema,
    deleteDairyProductSchema,
    getDairySchema
  };


const diarySchema= new Schema({

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },

    date: {
        type: String,
        required: [true, 'Data is required']
    },
    
    amountAll: {
      type: Number,
      min: 1,
    },

    Calories: {
          type: Number,
            default: 0,
           },

    burnedCalories: {
        type: Number,
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

