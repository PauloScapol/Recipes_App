import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import Profile from '../pages/Profile';

describe('first', () => {
  const emailPofile = 'profile-email';
  const btnDone = 'profile-done-btn';
  const btnFavorite = 'profile-favorite-btn';
  const btnLogout = 'profile-logout-btn';

  test('testa se aparece o email na tela', () => {
    renderWithRouter(<Profile />);
    const elementEmail = screen.getByTestId(emailPofile);
    expect(elementEmail).toBeInTheDocument();
  });
  test('testa se existe o botão Done Recipes na tela e se direciona para a tela de receitas feitas', async () => {
    const { history } = renderWithRouter(<Profile />);
    const doneBtn = screen.getByTestId(btnDone);
    expect(doneBtn).toBeInTheDocument();
    userEvent.click(doneBtn);
    waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/done-recipes');
    });
  });
  test('testa se existe o botão favorite recipes e se direciona para a rota certa', () => {
    const { history } = renderWithRouter(<Profile />);
    const favoriteBtn = screen.getByTestId(btnFavorite);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/favorite-recipes');
    });
  });
  test('testa se existe o botão "logout" e se direciona para a tela de login', () => {
    const { history } = renderWithRouter(<Profile />);
    const logoutBtn = screen.getByTestId(btnLogout);
    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);
    waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
  });
  // test('should first', () => {
  //   renderWithRouter(<Profile />);

  // });
  // test('should first', () => {
  //   renderWithRouter(<Profile />);

  // });
  // test('should first', () => {
  //   renderWithRouter(<Profile />);

  // });
});