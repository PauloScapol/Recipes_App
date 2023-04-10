import { React } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Provider } from 'react-redux';
import store from '../redux/store';
// import Login from './Login';

export default function Profile() {
  const history = useHistory();
  const btnLogout = () => {
    localStorage.clear();
    history.push('/');
  };
  const email = JSON.parse(localStorage.getItem('user'));
  console.log(email);

  return (
    <div>
      <Header title="Meals" showSearchIcon />
      <div>
        <h2
          data-testid="profile-email"
        >
          { email && email.email }
        </h2>

        <label htmlFor="btnDone">
          <button
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }

          >
            Favorite Recipes
          </button>
          <button
            data-testid="profile-logout-btn"
            onClick={ btnLogout }

          >
            Logout
          </button>
        </label>
      </div>
      <Footer />
    </div>
  );
}
