import PropTypes from 'prop-types';

export default function MealCardDetail({ mealDetail }) {
  const embedURL = mealDetail.strYoutube.split('=');
  const mealAr = Object.entries(mealDetail);
  const quantity = mealAr.filter((element) => (
    element[0].includes('strMeasure') && (
      element[1] !== ' ' && element[1] !== '' && element[1] !== null)));
  const ingredients = mealAr.filter((element) => (
    element[0].includes('strIngredient') && (element[1] !== '' && element[1] !== null)));
  return (
    <div>
      <h1 data-testid="recipe-title">{mealDetail.strMeal}</h1>
      <h3 data-testid="recipe-category">{mealDetail.strCategory}</h3>
      <img
        src={ mealDetail.strMealThumb }
        alt={ mealDetail.strMeal }
        data-testid="recipe-photo"
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
