import PropTypes from 'prop-types';
import { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import { copyUrl } from '../utils/copyUrl';

export default function DrinkCardDetail({ drinkDetail }) {
  const [clickButton, setClickButton] = useState(false);
  const drinkAr = Object.entries(drinkDetail);
  const quantity = drinkAr.filter((element) => (
    element[0].includes('strMeasure') && (
      element[1] !== ' ' && element[1] !== '' && element[1] !== null)));
  const ingredients = drinkAr.filter((element) => (
    element[0].includes('strIngredient') && element[1] !== null));

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
      <button type="button" data-testid="favorite-btn">Favorite</button>

    </div>
  );
}

DrinkCardDetail.propTypes = {
  drinkDetail: PropTypes.shape({
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strInstructions: PropTypes.string,
  }),
}.isRequired;
