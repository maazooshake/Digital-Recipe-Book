import { useState } from 'react'
import { useRecipesContext } from "../hooks/useRecipesContext" // to get access to dispatch function

const RecipeForm = () => {

    const { dispatch } = useRecipesContext()
    const [recipeName, setrecipeName] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [directions, setDirections] = useState('')
    const [prepTime, setprepTime] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setemptyFields] = useState([])

    
    const submitHandler = async (e) => {
        e.preventDefault()  // when submitting, the default is refreshing the page. preventing that with e.preventDefault()

        const recipe = {recipeName, ingredients, directions, prepTime}

        const response = await fetch('/api/recipes', { // must use /api/recipes for POST, etc. because of "app.use('/api/recipes', recipeRoutes)" in server.js
            method: 'POST',
            body: JSON.stringify(recipe), // must send body as json, this changes 'const recipe' into json string
            headers: {
                'Content-Type': 'application/json'
            } 
        })
        const json = await response.json()


        if(!response.ok) {
            setError(json.error)
            setemptyFields(json.emptyFields)
        }

        if(response.ok) {
            setrecipeName('')
            setIngredients('')
            setDirections('')
            setprepTime('')
            setError(null)
            setemptyFields([])
            console.log('New recipe successfully added!', json)
            dispatch({type: 'CREATE_RECIPE', payload: json}) //payload is json because in recipeController.js, the newRecipe function sends the new recipe as json to the browser
        }
    }


    return (
        <form className="create" onSubmit={submitHandler}>
            <h3>Add New Recipe</h3>

            <label>Recipe Name?:</label>
            <input 
                type="text"
                onChange={(e) => setrecipeName(e.target.value)} // e is event
                value={recipeName}
                className={emptyFields.includes('recipeName') ? 'error' : ''}
            />

            <label>Ingredients?:</label>
            <input 
                type="text"
                onChange={(e) => setIngredients(e.target.value)}
                value={ingredients}
            />

            <label>Directions?:</label>
            <input 
                type="text"
                onChange={(e) => setDirections(e.target.value)}
                value={directions}
            />

            <label>Estimated Prep Time:</label>
            <input 
                type="text"
                onChange={(e) => setprepTime(e.target.value)}
                value={prepTime}
            />

            <button>Submit Recipe</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default RecipeForm