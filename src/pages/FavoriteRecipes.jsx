import React from 'react';
import Header from '../components/Header';
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function FavoriteRecipes() {
  return (
      <Header title="Meals" showSearchIcon />
  );
}
