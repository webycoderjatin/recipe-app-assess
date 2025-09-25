import React, { useContext, useState } from "react";
import { fetchRecipesByName, getMealByIngredient } from "../api/TheMealDB";
import { recipeContext } from "../context/recipes";

const SearchBar = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(["All"]);
  const [searchMode, setSearchMode] = useState("ingredient");
  const [noResponse , setNoResponse] = useState(false)

  const {storeRecipes} = useContext(recipeContext);

  const handleSearch = async () => {
    if (!searchTerm) {
      alert("Please enter a search term");
      return;
    }

    setIsLoading(true);
    if (searchMode === "name") {
      try {
        const recipes = await fetchRecipesByName(searchTerm);
        setNoResponse(false)
        storeRecipes(recipes);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setNoResponse(true)
      }
      return;
    }

    if (searchMode === "ingredient") {
       try {
        const recipes = await getMealByIngredient(searchTerm);
        setNoResponse(false)
        storeRecipes(recipes);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setNoResponse(true)
      }
      return;
    }
  };

  return (
    <div>
      <div className="flex gap-2 items-center mb-4">
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search for a recipe..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
        >
          Search
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setSearchMode("ingredient")}
          className={`px-4 py-2 rounded-lg font-medium transition text-sm
      ${
        searchMode === "ingredient"
          ? "bg-orange-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
        >
          Search by Ingredient
        </button>
        <button
          onClick={() => setSearchMode("name")}
          className={`px-4 py-2 rounded-lg font-medium transition text-sm
      ${
        searchMode === "name"
          ? "bg-orange-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
        >
          Search by Dish Name
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 mt-4">
      <p className="px-0 py-2">Filter</p>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full font-medium transition 
        ${
          activeCategory === category
            ? "bg-orange-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
