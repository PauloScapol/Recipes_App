import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title, showSearchIcon }) {
  const history = useHistory();

  const navigateToProfile = () => {
    history.push('/profile');
  };

  return (
    <section>
      {showSearchIcon && (
        <button type="button">
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

      <h1 data-testid="page-title">{title}</h1>
    </section>
  );
}

Header.propTypes = {
  titleName: PropTypes.string,
}.isRequired;
