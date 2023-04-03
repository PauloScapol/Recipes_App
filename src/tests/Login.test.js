import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

describe('Testa aplicação', () => {
  renderWithRouter(<App />);
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submit = screen.getByTestId('login-submit-btn');
  it('Testa se os inputs estão na tela.', () => {
    renderWithRouter(<App />);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });
});
