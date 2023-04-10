import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import StartRecipeButton from './StartRecipeButton';

export default function DrinkCardDetail({ drinkDetail }) {
  const history = useHistory();
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
      <button type="button" data-testid="share-btn">Compartilhe</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
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
    strMeal: PropTypes.string,
    strInstructions: PropTypes.string,
  }),
}.isRequired;
