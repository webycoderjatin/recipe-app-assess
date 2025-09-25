import React, { createContext, useState } from "react";


export const recipeContext = createContext();

export const RecipeProvider = ({children})=>{

    const [recipes, setRecipes] = useState([]);

    const storeRecipes = (data) => {
        setRecipes(data);
    };

    const getRecipes = () => {
        return recipes;
    };

    return(
        <recipeContext.Provider value={{storeRecipes, getRecipes}}>
            {children}
        </recipeContext.Provider>
    )
}