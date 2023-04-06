import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../redux/store';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title, showSearchIcon }) {
  const [searchFood, setSearchFood] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const history = useHistory();

  const navigateToProfile = () => {
    history.push('/profile');
  };

  const handleClick = () => {
    if (searchFood === true) {
      setSearchFood(false);
    } else {
      setSearchFood(true);
    }
  };

  return (
    <section>

      {showSearchIcon && (
        <button type="button" onClick={ () => handleClick() }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
          />
        </button>
      )}

      <button type="button" onClick={ navigateToProfile }>
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile icon"
        />
      </button>

      {searchFood && (
        <form>
          <input
            type="text"
            placeholder="Search"
            data-testid="search-input"
            value={ searchInput }
            onChange={ ({ target }) => setSearchInput(target.value) }
          />
          <Provider store={ store }>
            <SearchBar inputSearch={ searchInput } title={ title } />
          </Provider>
        </form>
      )}
      <h1 data-testid="page-title">{title}</h1>

    </section>
  );
}

Header.propTypes = {
  titleName: PropTypes.string,
}.isRequired;
