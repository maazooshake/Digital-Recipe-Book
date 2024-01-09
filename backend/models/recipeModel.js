const mongoose = require('mongoose') // its mongoose that allows us to create models/schemas, MongoDB alone is schema-less

const Schema = mongoose.Schema // function to create new Schema

const recipeSchema = new Schema({
    
    recipeName: {
        type: String,
        required: true 
    }, 
      
    ingredients: {
        type: String, 
        required: false
    }, 

    directions: {
        type: String, 
        required: false
    },

    prepTime: {
        type: String, 
        required: false
    }

}, { timestamps: true})

module.exports = mongoose.model('Recipe', recipeSchema)
