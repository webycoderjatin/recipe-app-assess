import axios from 'axios';

export async function getMealByIngredient(ingredient) {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const meals = await Promise.all(
            response.data.meals.map(async (meal) => {
                const mealDetail = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                return mealDetail.data.meals[0];
            })
        );
        return meals;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function fetchRecipesByName(dishName) {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`);
        return response.data.meals;
    } catch (error) {
        console.log(error);
        return [];
    }
}


export async function getMealById(mealId) {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        return response.data.meals[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}