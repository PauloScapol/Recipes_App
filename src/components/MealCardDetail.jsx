import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Recomendations from './Recomendations';
import StartRecipeButton from './StartRecipeButton';
import copyUrl from '../utils/copyUrl';
import shareIcon from '../images/shareIcon.svg';
import white from '../images/whiteHeartIcon.svg';
import black from '../images/blackHeartIcon.svg';

export default function MealCardDetail({ mealDetail }) {
  const [clickButton, setClickButton] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();
  const embedURL = mealDetail.strYoutube.split('=');
  const mealAr = Object.entries(mealDetail);
  const quantity = mealAr.filter((element) => (
    element[0].includes('strMeasure') && (
      element[1] !== ' ' && element[1] !== '' && element[1] !== null)));
  const ingredients = mealAr.filter((element) => (
    element[0].includes('strIngredient') && (element[1] !== '' && element[1] !== null)));

  function handleFavorite() { // Função para lidar com o clique no botão de favoritar
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorited = favoriteRecipes
      .some((recipe) => recipe.id === mealDetail.idMeal);

    if (!isRecipeFavorited) {
      const favoriteRecipe = {
        id: mealDetail.idMeal,
        name: mealDetail.strMeal,
        image: mealDetail.strMealThumb,
        category: mealDetail.strCategory,
        alcoholicOrNot: '',
        nationality: mealDetail.strArea,
        type: 'meal',
      };

      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, favoriteRecipe]));

      setFavorite(true);
    } else {
      const filteredFavoriteRecipes = favoriteRecipes
        .filter((recipe) => recipe.id !== mealDetail.idMeal);

      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavoriteRecipes));

      setFavorite(false);
    }
  }

  useEffect(() => { // Efeito para verificar se a receita já foi favoritada anteriormente
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorited = favoriteRecipes
      .some((recipe) => recipe.id === mealDetail.idMeal);

    setFavorite(isRecipeFavorited);
  }, [mealDetail.idMeal]);

  return (
    <div>
      <h1 data-testid="recipe-title">{mealDetail.strMeal}</h1>
      <h3 data-testid="recipe-category">{mealDetail.strCategory}</h3>
      <img
        src={ mealDetail.strMealThumb }
        alt={ mealDetail.strMeal }
        data-testid="recipe-photo"
        style={ { width: '250px' } }
      />
      <p data-testid="instructions">{mealDetail.strInstructions}</p>
      <h3>Ingredientes:</h3>
      {ingredients.map((ingredient, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {ingredient[1]}
          {' '}
          {quantity[index][1]}
        </li>
      ))}
      <iframe data-testid="video" width="560" height="315" src={ `https://www.youtube.com/embed/${embedURL[1]}` } title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; gyroscope; picture-in-picture; web-share" />
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

MealCardDetail.propTypes = {
  Meal: PropTypes.shape({
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strMealThumb: PropTypes.string,
    strInstructions: PropTypes.string,
  }),
}.isRequired;
