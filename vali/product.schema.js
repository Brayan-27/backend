const Joi = require('joi');


const idSchema = Joi.object({
    id: Joi.string().uuid().required()
});

// vali crear 
const createProductSchema = Joi.object({
    name: Joi.string().min(4).max(30).required(),
    price: Joi.number().positive().required(),
    image: Joi.string().uri().required()
});

// vali la actualizacion
const updateProductSchema = Joi.object({
    name: Joi.string().min(4).max(30),
    price: Joi.number().positive(),
    image: Joi.string().uri()
});



module.exports = { idSchema, createProductSchema, updateProductSchema };