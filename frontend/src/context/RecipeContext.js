import { createContext, useReducer } from 'react'

export const RecipesContext = createContext()

export const recipesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_RECIPES': 
            return {
                recipes: action.payload // to set all the recipes, the payload property on the action passed into the 'dispatch' function would be an array of all recipes
            }
        case 'CREATE_RECIPE': 
            return {
                recipes: [action.payload, ...state.recipes] // action.payload will be the new recipe, but also still want the old ones -> thus including previous 'state' as well in array
            }
        case 'DELETE_RECIPE': 
            return {
                recipes: state.recipes.filter((r) => r._id !== action.payload._id) // what goes in the 'filter' parameter is what is to remain after the operation. 
            }
        default:
            return state
    }
}

export const RecipesContextProvider = ({ children }) => { // children utilizes the root app component that was wrapped with RecipesContextProvider in index.js
    
    const [state, dispatch] = useReducer(recipesReducer, {
        recipes: null
    }) 
    
    return (
    
    // ...state spreads out the values of the recipe
    <RecipesContext.Provider value={{...state, dispatch}}> 
        { children }
    </RecipesContext.Provider>
    )
}
