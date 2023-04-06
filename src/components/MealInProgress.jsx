import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MealInProgress({ setRecipe }) {
  const [meal, setMeal] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const { id } = useParams();
  const slice13 = 13;

  useEffect(() => {
    async function fetchMeal() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setMeal(data.meals[0]);
      setRecipe(data.meals[0]);

      const inProgressRecipes = JSON
        .parse(localStorage.getItem('inProgressRecipes')) || {};
      const currentRecipe = inProgressRecipes[data.meals[0].idMeal] || {};
      const ingredients = Object.keys(currentRecipe)
        .filter((ingredient) => currentRecipe[ingredient])
        .map((ingredient) => ingredient);

      setCheckedIngredients(ingredients);
    }

    fetchMeal();
  }, [id, setRecipe]);

  function handleCheckboxChange(e) {
    const { name } = e.target;

    if (checkedIngredients.includes(name)) {
      setCheckedIngredients(checkedIngredients
        .filter((ingredient) => ingredient !== name));
    } else {
      setCheckedIngredients([...checkedIngredients, name]);
    }

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [meal.idMeal]: {
        ...inProgressRecipes[meal.idMeal],
        [name]: !checkedIngredients.includes(name),
      },
    }));
  }

  return (
    <div>
      <img src={ meal.strMealThumb } alt="Recipe" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{meal.strMeal}</h1>
      <p data-testid="recipe-category">{meal.strCategory}</p>
      <ul>
        {Object.entries(meal)
          .filter(([key]) => key.startsWith('strIngredient') && meal[key])
          .map(([key, value], index) => (
            <label
              className={ checkedIngredients.includes(value) ? 'checked-ingredient' : '' }
              key={ key }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                name={ value }
                checked={ checkedIngredients.includes(value) }
                onChange={ handleCheckboxChange }
              />
              {value}
              -
              {meal[`strMeasure${key.slice(slice13)}`]}
            </label>
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
