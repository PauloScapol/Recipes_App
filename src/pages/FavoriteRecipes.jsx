import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState();

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(recipes);
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" showSearchIcon={ false } />
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      {favoriteRecipes && favoriteRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            width="200px"
            data-testid={ `${index}-horizontal-image` }
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${recipe.nationality} - ${recipe.category}`}
            {' '}
            { recipe.type === 'drink' && `${recipe.alcoholicOrNot}`}
          </p>
          <h5 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h5>
          <div
            data-testid={ `${index}-horizontal-share-btn` }
            src="../images/shareIcon.svg"
          >
            <img
              src={ shareIcon }
              alt="share icon"
            />
          </div>
          <div
            data-testid={ `${index}-horizontal-favorite-btn` }
            src="../images/blackHeartIcon.svg"
          >
            <img
              src={ blackHeartIcon }
              alt="favorite icon"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
