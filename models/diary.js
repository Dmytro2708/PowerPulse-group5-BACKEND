const Joi = require('joi');
const { Schema, model}= require('mongoose');
const handleMongooseError = require('../helpers/hendleMongooseError');

const createDairyProductSchema = Joi.object({
    _id: Joi.string().required(), 
    date: Joi.string().regex(/^[0-3][0-9\/[0-1][0-9]\/\d{4}$/).required(), 
    amount: Joi.number().min(1).regex(/^(\d+)g$/).required(),
    calories:Joi.number().min(1).required(),
    
})

const createDairyExerciseSchema = Joi.object({
    _id: Joi.string().required(), 
    date: Joi.string().regex(/^[0-3][0-9\/[0-1][0-9]\/\d{4}$/).required(), 
    time: Joi.number().min(1).required(),
    calories:Joi.number().min(1).required(),
    
})


const diarySchema= new Schema({

    date: {
        type: String,
        required: [true, 'Data is required']
    },

    amount:{
        type: Number,
    },

    calories: {
        type: Number,
        required: [true, 'Calories is required']
    },

    time: {
        type: Number,
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',}

},{versionKey:false, timestamps:true}) 

diarySchema.post('save', handleMongooseError);

const Diary = model('diary', diarySchema);

module.exports = {createDairyProductSchema, createDairyExerciseSchema, Diary}

