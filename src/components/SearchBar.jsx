import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { searchName, searchIngredient, searchFirstLetter } from '../redux/actions';

export default function SearchBar({ inputSearch }) {
  const [searchType, setSearchType] = useState('');
  const dispatch = useDispatch();

  const checkFirstLetter = () => (
    inputSearch.length > 1
      ? global.alert('Your search must have only 1 (one) character')
      : dispatch(searchFirstLetter(inputSearch)));

  const searchClick = () => {
    switch (searchType) {
    case 'ingredientSeach':
      console.log('ingredientSeach');
      return dispatch(searchIngredient(inputSearch));
    case 'nameSearch':
      console.log('nameSearch');
      return dispatch(searchName(inputSearch));
    default:
      checkFirstLetter();
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="ingredientSeach">
          <input
            type="radio"
            id="ingredientSeach"
            data-testid="ingredient-search-radio"
            name="radioButton"
            onClick={ ({ target }) => setSearchType(target.id) }
          />
          <span>Ingredient</span>
        </label>
        <label htmlFor="nameSearch">
          <input
            type="radio"
            id="nameSearch"
            data-testid="name-search-radio"
            name="radioButton"
            onClick={ ({ target }) => setSearchType(target.id) }
          />
          <span>Name</span>
        </label>
        <label htmlFor="firstLetterSearch">
          <input
            type="radio"
            id="firstLetterSearch"
            data-testid="first-letter-search-radio"
            name="radioButton"
            onClick={ ({ target }) => setSearchType(target.id) }
          />
          <span>First Letter</span>
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchClick }
      >
        SEARCH
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  searchInput: PropTypes.string,
}.isRequired;
