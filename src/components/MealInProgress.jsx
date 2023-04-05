import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function MealInProgress({ setRecipe }) {
  const [meal, setMeal] = useState({});
  const { id } = useParams();
  const slice13 = 13;

  useEffect(() => {
    async function fetchMeal() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setMeal(data.meals[0]);
      setRecipe(data.meals[0]);
    }

    fetchMeal();
  }, [id, setRecipe]);

  return (
    <div>
      <img src={ meal.strMealThumb } alt="Recipe" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{meal.strMeal}</h1>
      <p data-testid="recipe-category">{meal.strCategory}</p>
      <ul>
        {Object.entries(meal)
          .filter(([key]) => key.startsWith('strIngredient') && meal[key])
          .map(([key, value]) => (
            <li key={ key }>
              {value}
              -
              { meal[`strMeasure${key.slice(slice13)}`] }
            </li>
          ))}
      </ul>
      <p data-testid="instructions">{meal.strInstructions}</p>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

MealInProgress.propTypes = {
  setRecipe: PropTypes.func.isRequired,
};

export default MealInProgress;
