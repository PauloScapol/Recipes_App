import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function DrinkInProgress({ setRecipe }) {
  const [drink, setDrink] = useState({});
  const { id } = useParams();
  const slice13 = 13;

  useEffect(() => {
    async function fetchDrink() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDrink(data.drinks[0]);
      setRecipe(data.drinks[0]);
    }

    fetchDrink();
  }, [id, setRecipe]);

  return (
    <div>
      <img src={ drink.strDrinkThumb } alt="Recipe" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{drink.strDrink}</h1>
      <p data-testid="recipe-category">{drink.strAlcoholic}</p>
      <ul>
        {Object.entries(drink)
          .filter(([key]) => key.startsWith('strIngredient') && drink[key])
          .map(([key, value]) => (
            <li key={ key }>
              {value}
              -
              {drink[`strMeasure${key.slice(slice13)}`]}
            </li>
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

export default DrinkInProgress;
