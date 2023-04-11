import { render, screen } from '@testing-library/react';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testa o componente Favorite Recipes', () => {
  it('Testa se os itens favoritados estão renderizados na tela', () => {
    const recipeObj = [{
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg' }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeObj));
    render(<FavoriteRecipes />);
    const btnAll = screen.getByTestId('filter-by-all-btn');
    const btnMeals = screen.getByTestId('filter-by-meal-btn');
    const btnDrinks = screen.getByTestId('filter-by-drink-btn');
    expect(btnAll).toBeInTheDocument();
    expect(btnMeals).toBeInTheDocument();
    expect(btnDrinks).toBeInTheDocument();
  });
});
