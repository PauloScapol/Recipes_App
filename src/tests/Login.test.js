import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testa aplicação', () => {
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submit = screen.getByTestId('login-submit-btn');
  it('Testa se os inputs estão na tela.', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });
});
