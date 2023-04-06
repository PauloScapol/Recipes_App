import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Meals from '../components/Meals';
// import Drinks from '../components/Drinks';
import mockChickenFetch from './mocks/chickenData';
import mockSoupFetch from './mocks/soupData';
import mockletterYFetch from './mocks/yData';

const testIdSearchTopBtn = 'search-top-btn';
const testIdSearchInput = 'search-input';
const testIdSearchIngredientRadio = 'ingredient-search-radio';
const testIdSearchNameRadio = 'name-search-radio';
const testIdSearchFirstLetterRadio = 'first-letter-search-radio';
const testIdSearchButton = 'exec-search-btn';

describe('Testes de elementos do component SearchBar.js', () => {
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

describe('Testa busca pela radio ingredient de SearchBar.js', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockChickenFetch);
  });

  test('Meals: Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', () => {
    act(() => {
      render(<Meals />);
    });
    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const ingredientRadio = screen.getByTestId(testIdSearchIngredientRadio);
    userEvent.click(ingredientRadio);

    const searchInput = screen.getByTestId(testIdSearchInput);
    const ingredient = 'chicken';
    userEvent.type(searchInput, ingredient);

    const searchButton = screen.getByTestId(testIdSearchButton);
    userEvent.click(searchButton);
    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });
});

describe('Testa busca pela radio Name de SearchBar.js', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockSoupFetch);
  });

  test('Meals: Se o radio selecionado for Name, a busca na API é feita corretamente pelo nome', () => {
    act(() => {
      render(<Meals />);
    });
    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const nameRadio = screen.getByTestId(testIdSearchNameRadio);
    userEvent.click(nameRadio);

    const searchInput = screen.getByTestId(testIdSearchInput);
    const typeSoup = 'soup';
    userEvent.type(searchInput, typeSoup);

    const searchButton = screen.getByTestId(testIdSearchButton);
    userEvent.click(searchButton);

    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
  });
});

describe('Meals: Testa busca pela radio First Letter de SearchBar.js', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockletterYFetch);
  });

  test('Se o radio selecionado for First letter, a busca na API é feita corretamente pelo primeira letra', () => {
    act(() => {
      render(<Meals />);
    });
    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const firstLetterRadio = screen.getByTestId(testIdSearchFirstLetterRadio);
    userEvent.click(firstLetterRadio);

    const searchInput = screen.getByTestId(testIdSearchInput);
    const typeLetterY = 'y';
    userEvent.type(searchInput, typeLetterY);

    const searchButton = screen.getByTestId(testIdSearchButton);
    userEvent.click(searchButton);

    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=y');
  });
});
