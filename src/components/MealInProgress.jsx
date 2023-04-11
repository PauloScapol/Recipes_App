import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MealInProgress({ setRecipe }) {
  const [meal, setMeal] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const dateNow = new Date();
  const measure13 = 13;

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

  useEffect(() => {
    if (checkedIngredients.length === Object.keys(meal)
      .filter((key) => key.startsWith('strIngredient') && meal[key]).length) {
      setAllIngredientsChecked(true);
    } else {
      setAllIngredientsChecked(false);
    }
  }, [checkedIngredients, meal]);

  function handleFinishRecipe() {
    const doneRecipe = {
      id: meal.idMeal,
      nationality: meal.strArea,
      name: meal.strMeal,
      category: meal.strCategory,
      image: meal.strMealThumb,
      tags: meal.strTags ? meal.strTags.split(',') : [],
      alcoholicOrNot: '',
      type: 'meal',
      doneDate: dateNow.toISOString(),
    };

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, doneRecipe]));

    history.push('/done-recipes');
  }

  return (
    <div>
      <p data-testid="meal-in-progress"> </p>
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
              {' '}
              -
              {' '}
              {meal[`strMeasure${key.slice(measure13)}`]}
              {/* Como a chave strMeasure tem um número após as 12 primeiras letras, é necessário remover os primeiros 13 caracteres de key para obter apenas o número */}
            </label>
          ))}
      </ul>
      <p data-testid="instructions">{meal.strInstructions}</p>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !allIngredientsChecked }
        onClick={ handleFinishRecipe }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

MealInProgress.propTypes = {
  setRecipe: PropTypes.func.isRequired,
};
