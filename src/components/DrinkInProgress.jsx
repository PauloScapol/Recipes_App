import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/DrinkInProgress.css';

export default function DrinkInProgress({ setRecipe }) {
  const [drink, setDrink] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const dateNow = new Date();
  const measure13 = 13;

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

  useEffect(() => {
    if (checkedIngredients.length === Object.keys(drink)
      .filter((key) => key.startsWith('strIngredient') && drink[key]).length) {
      setAllIngredientsChecked(true);
    } else {
      setAllIngredientsChecked(false);
    }
  }, [checkedIngredients, drink]);

  function handleFinishRecipe() {
    const doneRecipe = {
      id: drink.idDrink,
      nationality: '', // Tive que olhar o arquivo do Cypress um milhão de vezes pra ver que o erro era que as bebidas não tem nacionalidade
      name: drink.strDrink,
      category: drink.strCategory,
      image: drink.strDrinkThumb,
      tags: drink.strTags ? drink.strTags.split(',') : [],
      alcoholicOrNot: drink.strAlcoholic,
      type: 'drink',
      doneDate: dateNow.toISOString(),
    };

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, doneRecipe]));

    history.push('/done-recipes');
  }

  return (
    <div>
      <p data-testid="drink-in-progress"> </p>
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
              {' '}
              -
              {' '}
              {drink[`strMeasure${key.slice(measure13)}`]}
              {/* Como a chave strMeasure tem um número após as 12 primeiras letras, é necessário remover os primeiros 13 caracteres de key para obter apenas o número */}
            </label>
          ))}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
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

DrinkInProgress.propTypes = {
  setRecipe: PropTypes.func.isRequired,
};
