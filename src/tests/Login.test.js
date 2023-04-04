import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
// import Login from '../pages/Login';

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
  it('Testa se o botão inicia desabilitado.', () => {
    renderWithRouter(<App />);
    expect(submit).toBeDisabled();
  });
  it('Testa se o botão leva até a rota "/meals', async () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '12345678');
    userEvent.click(submit);
    console.log(pathname);
    expect(pathname).toBe('/meals');
  });
  it('Testa se o botão fica habilitado após preencher o forms.', () => {
    renderWithRouter(<App />);
    userEvent.type(emailInput, 'test@test.net');
    userEvent.type(passwordInput, '1234567');
    // const btnOpen = screen.getByRole('button', { name: 'ENTER' });
    expect(submit).toBeEnabled();
  });
});
