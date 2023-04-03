import { useEffect, useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isDisabled: true,
  });

  const validateEmail = () => {
    const magicNumber = 7;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(formData.email) && formData.password.length >= magicNumber) {
      setFormData((prevState) => ({
        ...prevState,
        isDisabled: false,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        isDisabled: true,
      }));
    }
  };

  useEffect(() => {
    validateEmail();
  }, [formData.email, formData.password]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }), () => {
      validateEmail();
    });
  };

  const saveOnLocalStorage = () => {
    const dataUser = {
      email: formData.email,
    };
    localStorage.setItem('user', JSON.stringify(dataUser));
  };
  return (
    <form>
      <label>
        <input
          name="email"
          type="email"
          data-testid="email-input"
          placeholder="Email"
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label>
        <input
          name="password"
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="btn-enter">
        <button
          type="submit"
          id="btn-enter"
          data-testid="login-submit-btn"
          disabled={ formData.isDisabled }
          onClick={ () => saveOnLocalStorage() }
        >
          ENTER

        </button>
      </label>
    </form>
  );
}
