import { useRecipesContext } from '../hooks/useRecipesContext'
//date fns import below to show when a recipe was added
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RecipeDetails = ({ recipe }) => {

    const { dispatch } = useRecipesContext() 

    const handleClick = async () => {
        const response = await fetch('/api/recipes/' + recipe._id, {
            method: 'DELETE'
        })
        const json = await response.json() // in the case of a delete request, the json data is the deleted item

        if (response.ok) {
            dispatch({type: 'DELETE_RECIPE', payload: json})
        }

        if (!response.ok) {

        }
    }

    return (
        <div className="recipe-details">
            <h4>{recipe.recipeName}</h4>
            <p><strong>Ingredients: </strong>{recipe.ingredients}</p>
            <p><strong>Directions: </strong>{recipe.directions}</p>
            <p><strong>Prep Time: </strong>{recipe.prepTime}</p>
            <p>{formatDistanceToNow(new Date(recipe.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span> 
        </div> //"addSuffix" allows "ago" as in "2 days ago". 
    )
}

export default RecipeDetails