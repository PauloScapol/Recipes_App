import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function RecipeDetails({ match: { params } }) {
  const [meal, setMeal] = useState(null);
  const [drink, setDrink] = useState(null);
  const { id } = params;

  useEffect(() => {
    async function getMeal() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setMeal(data.meals[0]);
    }
    async function getDrink() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDrink(data.drinks[0]);
    }
    getMeal();
    getDrink();
  }, [id]);

  if (!meal && !drink) {
    return <div>Loading...</div>;
  }

  if (meal) {
    const embedURL = meal.strYoutube.split('=');
    const mealAr = Object.entries(meal);
    const ingredients = mealAr.filter((element) => (
      element[0].includes('strIngredient') && element[1] !== ''));
    return (
      <div>
        <h1 data-testid="recipe-title">{meal.strMeal}</h1>
        <h3 data-testid="recipe-category">{meal.strCategory}</h3>
        <img
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          data-testid="recipe-photo"
        />
        <p data-testid="instructions">{meal.strInstructions}</p>
        <h3>Ingredientes:</h3>
        {ingredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {ingredient[1]}

          </li>
        ))}
        <iframe data-testid="video" width="560" height="315" src={ `https://www.youtube.com/embed/${embedURL[1]}` } title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; gyroscope; picture-in-picture; web-share" />
      </div>
    );
  }

  if (drink) {
    const drinkAr = Object.entries(drink);
    const ingredients = drinkAr.filter((element) => (
      element[0].includes('strIngredient') && element[1] !== null));
    return (
      <div>
        <h1 data-testid="recipe-title">{drink.strDrink}</h1>
        <h3 data-testid="recipe-category">{drink.strCategory}</h3>
        <p>
          (
          {drink.strAlcoholic}
          )
        </p>
        <img
          src={ drink.strDrinkThumb }
          alt={ drink.strMeal }
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-category">{drink.strInstructions}</p>
        <h3>Ingredientes:</h3>
        {ingredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {ingredient[1]}

          </li>
        ))}
      </div>
    );
  }
}

// RecipeDetails.propTypes = {
//   params: PropTypes.string({
//   }),
// };
RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
