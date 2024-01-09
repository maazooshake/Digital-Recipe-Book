const Recipe = require('../models/recipeModel')
const mongoose = require('mongoose') // mongoose for schema/model

// get all recipes
const getRecipes = async (req, res) => {
    const recipes = await Recipe.find({}).sort({createdAt: -1})
    res.status(200).json(recipes)
}


// get ONE single recipe
const getRecipe = async (req, res) => {
    const {id} = req.params // .params takes the parameters of the req

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Recipe does not exist'}) // Mongoose expects id's to be 24 digit hex. This handles any exceptions to that rule. 
    }
    const recipe = await Recipe.findById(id)

    if (!recipe) {
        return res.status(404).json({error: 'Recipe does not exist'})
    }

    res.status(200).json(recipe)

}

// create new recipe
const newRecipe = async(req, res) => {
    const {recipeName, ingredients, directions, prepTime} = req.body // asynchronous so using 'async'

    let emptyFields = []

    if (!recipeName) {
        emptyFields.push('recipeName')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill all mandatory information', emptyFields})
    }

    // adding new recipe document to database
    try {
        const recipe = await Recipe.create({recipeName, ingredients, directions, prepTime}) // asynchronous so using 'await'. The new document that was created here is stored in the 'recipe' const. 
        res.status(200).json(recipe)
    } 
    
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete recipe 

const deleteRecipe = async (req, res) => {
    const {id} = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Recipe does not exist'}) // Mongoose expects id's to be 24 digit hex. This handles any exceptions to that rule. 
    }

    const recipe = await Recipe.findOneAndDelete({_id: id})

    if (!recipe) {
        return res.status(404).json({error: 'Recipe does not exist'})
    }

    res.status(200).json(recipe)

}

// patch recipe
const patchRecipe = async (req, res) => {
    const {id} = req.params // .params takes the parameters of the req

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Recipe does not exist'}) // Mongoose expects id's to be 24 digit hex. This handles any exceptions to that rule. 
    }

    const recipe = await Recipe.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!recipe) {
        return res.status(404).json({error: 'Recipe does not exist'})
    }

    res.status(200).json(recipe)
}


module.exports = {
    newRecipe, 
    getRecipes, 
    getRecipe, 
    deleteRecipe, 
    patchRecipe
}