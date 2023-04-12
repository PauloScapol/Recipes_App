import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/DrinkInProgress.css';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DrinkInProgress({ setRecipe }) {
  const [drink, setDrink] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState('');
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

    if (doneRecipes.some((recipe) => recipe.id === drink.idDrink)) {
      // alert('You have already finished this recipe!');
      history.push('/done-recipes');
      return;
    }

    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, doneRecipe]));

    history.push('/done-recipes');
  }

  function handleFavorite() { // Função para lidar com o clique no botão de favoritar
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorited = favoriteRecipes
      .some((recipe) => recipe.id === drink.idDrink);

    if (!isRecipeFavorited) {
      const favoriteRecipe = {
        id: drink.idDrink,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        nationality: '',
        type: 'drink',
      };

      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, favoriteRecipe]));

      setIsFavorite(true);
    } else {
      const filteredFavoriteRecipes = favoriteRecipes
        .filter((recipe) => recipe.id !== drink.idDrink);

      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavoriteRecipes));

      setIsFavorite(false);
    }
  }

  useEffect(() => { // Efeito para verificar se a receita já foi favoritada anteriormente
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorited = favoriteRecipes
      .some((recipe) => recipe.id === drink.idDrink);

    setIsFavorite(isRecipeFavorited);
  }, [drink.idDrink]);

  function copyLink() {
    const currentUrl = window.location.href;
    const linkWithoutInProgress = currentUrl.replace('/in-progress', '');
    clipboardCopy(linkWithoutInProgress);
    setMessage('Link copied!');
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

      <button
        type="button"
        onClick={ copyLink }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="Share recipe"
        />
      </button>

      {message && <span>{message}</span>}

      <button
        type="button"
        onClick={ handleFavorite }
      >
        {isFavorite
          ? <img data-testid="favorite-btn" src={ blackHeartIcon } alt="Favorited" />
          : <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="Not favorited" />}
      </button>

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
