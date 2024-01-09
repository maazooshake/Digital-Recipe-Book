import { useEffect } from 'react'
import { useRecipesContext } from "../hooks/useRecipesContext"

import RecipeDetails from '../components/RecipeDetails' // components
import RecipeForm from '../components/RecipeForm'

const Home = () => {
    const {recipes, dispatch} = useRecipesContext()

    useEffect(() => {
        const retrieveRecipes = async () => {
            const response = await fetch('/api/recipes')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_RECIPES', payload: json})
            }
        }

        retrieveRecipes()
    }, [dispatch]) 

    return (
        <div className="home">
            <div className="recipes">
                {recipes && recipes.map((recipe) => (
                    <RecipeDetails key={recipe._id} recipe={recipe} /> // listing all the properties of a recipe via <RecipeDetails> component
                ))}
            </div>
            <RecipeForm />
        </div>
    )
}

export default Home