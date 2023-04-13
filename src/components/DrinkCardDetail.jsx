import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Recomendations from './Recomendations';
import StartRecipeButton from './StartRecipeButton';
import copyUrl from '../utils/copyUrl';
import shareIcon from '../images/shareIcon.svg';
import white from '../images/whiteHeartIcon.svg';
import black from '../images/blackHeartIcon.svg';

export default function DrinkCardDetail({ drinkDetail }) {
  const [clickButton, setClickButton] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();
  const drinkAr = Object.entries(drinkDetail);
  const quantity = drinkAr.filter((element) => (
    element[0].includes('strMeasure') && (
      element[1] !== ' ' && element[1] !== '' && element[1] !== null)));
  const ingredients = drinkAr.filter((element) => (
    element[0].includes('strIngredient') && element[1] !== null));

  function handleFavorite() { // Função para lidar com o clique no botão de favoritar
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorited = favoriteRecipes
      .some((recipe) => recipe.id === drinkDetail.idDrink);

    if (!isRecipeFavorited) {
      const favoriteRecipe = {
        id: drinkDetail.idDrink,
        name: drinkDetail.strDrink,
        image: drinkDetail.strDrinkThumb,
        category: drinkDetail.strCategory,
        alcoholicOrNot: drinkDetail.strAlcoholic,
        nationality: '',
        type: 'drink',
      };

      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, favoriteRecipe]));

      setFavorite(true);
    } else {
      const filteredFavoriteRecipes = favoriteRecipes
        .filter((recipe) => recipe.id !== drinkDetail.idDrink);

      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavoriteRecipes));

      setFavorite(false);
    }
  }

  useEffect(() => { // Efeito para verificar se a receita já foi favoritada anteriormente
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorited = favoriteRecipes
      .some((recipe) => recipe.id === drinkDetail.idDrink);

    setFavorite(isRecipeFavorited);
  }, [drinkDetail.idDrink]);

  return (
    <div>
      <h1 data-testid="recipe-title">{drinkDetail.strDrink}</h1>
      <h3 data-testid="recipe-category">
        {drinkDetail.strCategory}
        {' '}
        {drinkDetail.strAlcoholic}
      </h3>
      <img
        src={ drinkDetail.strDrinkThumb }
        alt={ drinkDetail.strDrink }
        data-testid="recipe-photo"
        style={ { width: '250px' } }
      />
      <p data-testid="instructions">{drinkDetail.strInstructions}</p>
      <h3>Ingredientes:</h3>
      {ingredients.map((ingredient, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {`${ingredient[1]}`}
          { ' ' }
          { quantity[index] !== undefined ? quantity[index][1] : ''}
        </li>
      ))}
      {clickButton && (
        <span> Link copied! </span>
      )}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => copyUrl(setClickButton) }
      >
        <img
          src={ shareIcon }
          alt="share icon"
        />
      </button>
      <button
        type="button"
        onClick={ handleFavorite }
      >
        {favorite
          ? (<img data-testid="favorite-btn" src={ black } alt="favorite" />)
          : (<img data-testid="favorite-btn" src={ white } alt="not favorite" />)}

      </button>
      <Recomendations />
      <StartRecipeButton type={ history.location.pathname } />
    </div>
  );
}

DrinkCardDetail.propTypes = {
  drinkDetail: PropTypes.shape({
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    // strMeal: PropTypes.string,
    strInstructions: PropTypes.string,
  }),
}.isRequired;
