const express = require('express') 
const {
    newRecipe, 
    getRecipe, 
    getRecipes, 
    deleteRecipe, 
    patchRecipe
} = require('../controllers/recipeController')

const router = express.Router() 

//GET all recipes
router.get('/', getRecipes)

//GET one recipe 
router.get('/:id', getRecipe)

// POST new recipe
router.post('/', newRecipe)

// DELETE recipe
router.delete('/:id', deleteRecipe)

// UPDATE recipe
router.patch('/:id',patchRecipe)

module.exports = router



