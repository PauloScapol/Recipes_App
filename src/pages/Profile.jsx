import { React } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import doneIcon from '../images/doneIcon.svg';
import favoriteRecipesIcon from '../images/favoriteRecipesIcon.svg';
import logoutIcon from '../images/logoutIcon.svg';
import '../styles/Profile.css';

export default function Profile() {
  const history = useHistory();
  const btnLogout = () => {
    localStorage.clear();
    history.push('/');
  };
  const email = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header title="Profile" showSearchIcon={ false } />
      <div className="profile-container">
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
            <img src={ doneIcon } alt="icon-done" />
          </button>
          <button
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }

          >
            <img src={ favoriteRecipesIcon } alt="icon-done" />
          </button>
          <button
            data-testid="profile-logout-btn"
            onClick={ btnLogout }

          >
            <img src={ logoutIcon } alt="icon-done" />
          </button>
        </label>
      </div>
      <Footer />
    </div>
  );
}
