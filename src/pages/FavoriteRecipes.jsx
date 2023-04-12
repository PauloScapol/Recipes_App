import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState();
  const [clickButton, setClickButton] = useState(false);
  const [mealRecipes, setMealRecipes] = useState(null);
  const [drinkRecipes, setDrinkRecipes] = useState(null);

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

  const filter = (type) => {
    if (type === 'meals') {
      const recipesFiltered = favoriteRecipes.filter((e) => e.type === 'meal');
      setMealRecipes(recipesFiltered);
    }
    if (type === 'drinks') {
      const recipesFiltered = favoriteRecipes.filter((e) => e.type === 'drink');
      setDrinkRecipes(recipesFiltered);
    }
    if (type === 'all') {
      setMealRecipes(null);
      setDrinkRecipes(null);
    }
  };
  return (
    <div>
      <Header title="Favorite Recipes" showSearchIcon={ false } />
      <button data-testid="filter-by-all-btn" onClick={ () => filter('all') }>All</button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => filter('meals') }
      >
        Meals

      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => filter('drinks') }
      >
        Drinks

      </button>
      { drinkRecipes && drinkRecipes.map((recipe, index) => (
        <div key={ index }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
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
          </Link>
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
      { mealRecipes && mealRecipes.map((recipe, index) => (
        <div key={ index }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
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
          </Link>
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
      {(favoriteRecipes
      && mealRecipes === null
      && drinkRecipes === null) && favoriteRecipes.map((recipe, index) => (
        <div key={ index }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
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
          </Link>
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
