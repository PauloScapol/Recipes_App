import { render, screen, userEvent, waitFor } from '@testing-library/react';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testa o componente Favorite Recipes', () => {
  it('Testa se os inputs de filtro estão na tela', () => {
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
  it('Testa se as receitas favoritadas estão renderizadas na tela', () => {
    const recipeObj = [{
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg' }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeObj));
    render(<FavoriteRecipes />);
    expect(JSON.parse(window.localStorage.getItem('favoriteRecipes'))).toStrictEqual(recipeObj);
  });
  it('Testa se o link é copiado corretamente', async () => {
    const recipeObj = [{
      id: '53065',
      type: 'meal',
      nationality: 'Japanese',
      category: 'Seafood',
      name: 'Sushi',
      image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg' }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeObj));
    render(<FavoriteRecipes />);
    const btnShare = screen.getByRole('img', {
      name: /share icon/i,
    });
    waitFor(async () => {
      expect(btnShare).toBeInTheDocument();
      userEvent.click(btnShare);
      const clipboardContent = await navigator.clipboard.readText();
      expect(clipboardContent).toBe('http://localhost:3000/meals/53065');
    });
  });
  it('Testa se o link é copiado corretamente', async () => {
    const recipeObj = [{
      id: '17222',
      type: 'drink',
      nationality: 'Japanese',
      category: null,
      name: 'A1',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg' }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeObj));
    render(<FavoriteRecipes />);
    const btnShare = screen.getByRole('img', {
      name: /share icon/i,
    });
    waitFor(async () => {
      expect(btnShare).toBeInTheDocument();
      userEvent.click(btnShare);
      const clipboardContent = await navigator.clipboard.readText();
      expect(clipboardContent).toBe('http://localhost:3000/drinks/17222');
    });
  });
});
