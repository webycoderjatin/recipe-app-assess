import React, { useContext, useEffect, useState } from "react";
import { getMealByIngredient, fetchRecipesByName } from "./api/TheMealDB";
import RecipeCard from "./components/RecipeCard";
import SearchBar from "./components/SearchBar";
import { recipeContext } from "./context/recipes";
import NoResults from "./assets/no-recipe-found.png";
import LoadingSpinner from "./components/LoadingSpinner";
import { Route, Routes } from "react-router-dom";
import DetailScreen from "./pages/DetailScreen";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const { getRecipes } = useContext(recipeContext);

  useEffect(() => {
    setIsLoading(true);
    getMealByIngredient("tomato").then((recipes) => {
      setRecipes(recipes);
      setIsLoading(false);
    });
  }, []);

  const displayedRecipes =
    activeCategory === "All"
      ? getRecipes()
      : getRecipes().filter((recipe) => recipe.strCategory === activeCategory);

  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route
          path="/"
          element={
            <>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <div>
                  <SearchBar />
                  <div className="flex flex-wrap">
                    {displayedRecipes.length != 0 ? (
                      displayedRecipes.map((recipe) => (
                        <RecipeCard key={recipe.idMeal} recipe={recipe} />
                      ))
                    ) : (
                      <div className="flex flex-col justify-center items-center gap-0 mx-auto mt-20">
                        <img
                          src={NoResults}
                          alt=""
                          className="w-40 h-40 animate-[spin_4s_linear_infinite]"
                        />
                        <h1 className="text-center text-2xl mx-auto font-bold">
                          No recipes found
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          }
        />
        <Route path="/recipe/:id" element={<DetailScreen/>} />
      </Routes>
    </div>
  );
};

export default App;
