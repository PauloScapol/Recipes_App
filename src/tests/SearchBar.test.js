import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWith';
// import Meals from '../pages/Meals';
// import SearchBar from '../components/SearchBar';
import App from '../App';

describe('Testes do component SearchBar.js', () => {
  const testIdSearchTopBtn = 'search-top-btn';
  const testIdSearchInput = 'search-input';
  const testIdSearchIngredientRadio = 'ingredient-search-radio';
  const testIdSearchNameRadio = 'name-search-radio';
  const testIdSearchFirstLetterRadio = 'first-letter-search-radio';
  const testIdSearchButton = 'exec-search-btn';
  const path = '/meals';

  test('Testa se os elementos da barra de busca estão presentes', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(path);
    });

    expect(history.location.pathname).toBe(path);

    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    expect(searchTopBtn).toBeVisible();
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(testIdSearchInput);
    expect(searchInput).toBeVisible();

    const ingredientRadio = screen.getByTestId(testIdSearchIngredientRadio);
    expect(ingredientRadio).toBeVisible();

    const nameRadio = screen.getByTestId(testIdSearchNameRadio);
    expect(nameRadio).toBeVisible();

    const firstLetterRadio = screen.getByTestId(testIdSearchFirstLetterRadio);
    expect(firstLetterRadio).toBeVisible();

    const searchButton = screen.getByTestId(testIdSearchButton);
    expect(searchButton).toBeVisible();
  });
});
