import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import RecipeDetails from '../pages/RecipeDetails';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import renderPath from './helpers/renderPath';
import App from '../App';

describe('Testa botão de start recipe', () => {
  it('Verifica se o botão está na tela', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('meals/52977');
    });
    await waitFor(() => {
      const startRecipeButton = screen.getByTestId('start-recipe-btn');
      expect(startRecipeButton).toBeInTheDocument();
    });
  });
});
