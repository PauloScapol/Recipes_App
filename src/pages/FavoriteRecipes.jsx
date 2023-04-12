import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState();
  const [clickButton, setClickButton] = useState(false);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(recipes);
  }, []);

  const copyUrl = (index) => {
    setClickButton(true);
    if (favoriteRecipes[index].type === 'drink') {
      const url = `http://localhost:3000/drinks/${favoriteRecipes[index].id}`;
      navigator.clipboard.writeText(url);
    }
    if (favoriteRecipes[index].type === 'meal') {
      const url = `http://localhost:3000/meals/${favoriteRecipes[index].id}`;
      navigator.clipboard.writeText(url);
    }
  };

  const removeFavorite = (recipeName) => {
    const recipesFiltered = favoriteRecipes.filter((e) => e.name !== recipeName);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipesFiltered));
    setFavoriteRecipes(recipesFiltered);
    console.log(recipesFiltered);
  };
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
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            src="../images/shareIcon.svg"
            onClick={ () => copyUrl(index) }
          >
            <img
              src={ shareIcon }
              alt="share icon"
            />
          </button>
          {clickButton && (
            <span> Link copied! </span>
          )}
          <button
            data-testid={ `${index}-horizontal-favorite-btn` }
            src="../images/blackHeartIcon.svg"
            onClick={ () => removeFavorite(recipe.name) }
          >
            <img
              src={ blackHeartIcon }
              alt="favorite icon"
            />
          </button>
        </div>
      ))}
    </div>
  );
}
