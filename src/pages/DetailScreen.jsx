import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMealById } from "../api/TheMealDB";

const DetailScreen = () => {
  const params = useParams();
  const [meal, setMeal] = useState({});

  useEffect(() => {
    try {
      getMealById(params.id).then((meal) => {
        setMeal(meal);
        console.log(meal);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container m-5 flex gap-10">
      <img src={meal.strMealThumb} alt="" className="rounded-2xl h-96 w-96" />
      <div className="overflow-y-scroll h-full">
        <h1 className="text-3xl font-bold text-orange-500 mb-5">
          {meal.strMeal}
        </h1>
        <h2 className="text-xl font-semibold text-orange-400 bg-orange-100 inline-block px-3 py-2 rounded-lg">
          Instructions
        </h2>
        <p className="mb-5">{meal.strInstructions}</p>
        <h2 className="text-xl font-semibold text-orange-400 bg-orange-100 inline-block px-3 py-2 rounded-lg">
          Ingredients
        </h2>
        <br />
        {Object.keys(meal).map((key) => {
          if (key.startsWith("strIngredient") && meal[key]) {
            return (
              <li
                key={key}
                className="inline-block bg-gray-200 py-2 px-4 rounded-lg m-1"
              >
                {meal[key]}
              </li>
            );
          }
          return null;
        })}
        <br />
        <h2 className="text-xl font-semibold text-orange-400 bg-orange-100 inline-block px-3 py-2 rounded-lg mt-5">
          Youtube Video
        </h2>
        {meal.strYoutube && (
  <iframe
    src={`https://www.youtube.com/embed/${meal.strYoutube.split("=")[1]}`}
    width="560"
    height="315"
    frameBorder="0"
    allowFullScreen
    title="Recipe Video"
    className="mt-5"
  />
)}

      </div>
    </div>
  );
};

export default DetailScreen;
