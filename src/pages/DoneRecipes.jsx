import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import shareIcon from '../images/shareIcon.svg';

export default function ReceitasFeitas() {
  const [recipes, setRecipes] = useState([]);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setRecipes(doneRecipes);
  }, []);

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    if (filterType === 'All') {
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
          onClick={ () => handleFilter('All') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => handleFilter('Meals') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => handleFilter('Drinks') }
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
              />

              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.nationality ? `${recipe.nationality} - ` : ''}
                {recipe.category}
              </p>

              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </Link>

            <p data-testid={ `${index}-horizontal-done-date` }>
              Done on:
              {' '}
              {recipe.doneDate}
            </p>

            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
            >
              Share
            </button>

            <div>
              {recipe.tags.map((tag) => (
                <span
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
