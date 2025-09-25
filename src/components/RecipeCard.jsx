import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  console.log(recipe);
  return (
    <div className="m-4 w-60 bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition duration-300">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-50 object-cover rounded-2xl"
      />
      <h2 className="text-start text-lg font-semibold px-2 pt-2">
        {recipe.strMeal}
      </h2>
      <Link to={`/recipe/${recipe.idMeal}`}>
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded w-2/3 rounded-full cursor-pointer m-2">Lets Make it !</button>
      </Link>
    </div>
  );
};

export default RecipeCard;
