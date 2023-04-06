import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/DrinkInProgress.css';

export default function DrinkInProgress({ setRecipe }) {
  const [drink, setDrink] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const { id } = useParams();
  const slice13 = 13;

  useEffect(() => {
    async function fetchDrink() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDrink(data.drinks[0]);
      setRecipe(data.drinks[0]);

      const inProgressRecipes = JSON
        .parse(localStorage.getItem('inProgressRecipes')) || {};
      const currentRecipe = inProgressRecipes[data.drinks[0].idDrink] || {};
      const ingredients = Object.keys(currentRecipe)
        .filter((ingredient) => currentRecipe[ingredient])
        .map((ingredient) => ingredient);

      setCheckedIngredients(ingredients);
    }

    fetchDrink();
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
      [drink.idDrink]: {
        ...inProgressRecipes[drink.idDrink],
        [name]: !checkedIngredients.includes(name),
      },
    }));
  }

  return (
    <div>
      <img src={ drink.strDrinkThumb } alt="Recipe" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{drink.strDrink}</h1>
      <p data-testid="recipe-category">{drink.strAlcoholic}</p>
      <ul>
        {Object.entries(drink)
          .filter(([key]) => key.startsWith('strIngredient') && drink[key])
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
              {drink[`strMeasure${key.slice(slice13)}`]}
            </label>
          ))}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

DrinkInProgress.propTypes = {
  setRecipe: PropTypes.func.isRequired,
};
