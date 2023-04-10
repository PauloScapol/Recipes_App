import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setRecipes(doneRecipes);
  }, []);

  const handleFilterClick = (event) => {
    setFilterType(event.target.name);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    if (filterType === 'all') {
      return true;
    }
    return recipe.type === filterType.toLowerCase();
  });

  return (
    <div>
      <Header title="Done Recipes" showSearchIcon={ false } />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          name="all"
          onClick={ handleFilterClick }
          disabled={ filterType === 'all' }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          name="meal"
          onClick={ handleFilterClick }
          disabled={ filterType === 'meal' }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          name="drink"
          onClick={ handleFilterClick }
          disabled={ filterType === 'drink' }
        >
          Drinks
        </button>
      </div>
      <div>
        {filteredRecipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
                width="200"
              />

              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </Link>

            {recipe.type === 'meal' ? (
              <div>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.nationality ? `${recipe.nationality} - ` : ''}
                  {recipe.category}
                </p>

                {recipe.tags.slice(0, 2).map((tag) => (
                  <span
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </span>
                ))}

              </div>

            ) : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholicOrNot}
              </p>
            )}

            <p data-testid={ `${index}-horizontal-done-date` }>
              Done on:
              {' '}
              {recipe.doneDate}
            </p>

            <button
              type="button"
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Share recipe"
              />
            </button>

          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
