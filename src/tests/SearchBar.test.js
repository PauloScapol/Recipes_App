import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
// import { renderWithRouter } from './helpers/renderWith';
import Meals from '../pages/Meals';
// import App from '../App';

describe('Testes do component SearchBar.js', () => {
  const testIdSearchTopBtn = 'search-top-btn';
  const testIdSearchInput = 'search-input';
  const testIdSearchIngredientRadio = 'ingredient-search-radio';
  const testIdSearchNameRadio = 'name-search-radio';
  const testIdSearchFirstLetterRadio = 'first-letter-search-radio';
  const testIdSearchButton = 'exec-search-btn';

  test('Testa se os elementos da barra de busca estão presentes', async () => {
    render(<Meals />);

    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    expect(searchTopBtn).toBeInTheDocument();
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
