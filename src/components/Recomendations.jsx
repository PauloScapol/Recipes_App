import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Recomendations.css';

export default function Recomendations() {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const history = useHistory();
  const fetchDrinks = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();

    setDrinks(data.drinks);
  };

  const fetchMeals = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setMeals(data.meals);
  };
  useEffect(() => {
    if (history.location.pathname.includes('drinks')) {
      fetchMeals();
    }
    if (history.location.pathname.includes('meals')) {
      fetchDrinks();
    }
  }, []);
  // const count = 1;
  // const nextRecomendation = () => {
  //   if (count >= 3) {
  //     count = 1
  //   } else {
  //     count++;
  //   }
  //   document.getElementById(`radio${count}`).checked = true
  // };

  // setInterval(() => {
  //   nextRecomendation();
  // }, 4000);

  if (meals.length > 0) {
    return (
      <section className="slider">
        <h3>Recomendações</h3>
        <div className="slider-content">

          <input
            type="radio"
            name="btn-radio"
            id="radio1"
            onClick={ () => {
              const elements = document.getElementsByClassName('re-card');
              Array.from(elements).forEach((element) => {
                element.removeAttribute('hidden');
              });
            } }
          />
          <input
            type="radio"
            name="btn-radio"
            id="radio2"
            onClick={ () => {
              const elements = document.getElementsByClassName('re-card');
              Array.from(elements).forEach((element) => {
                element.removeAttribute('hidden');
              });
            } }
          />
          <input
            type="radio"
            name="btn-radio"
            id="radio3"
            onClick={ () => {
              const elements = document.getElementsByClassName('re-card');
              Array.from(elements).forEach((element) => {
                element.removeAttribute('hidden');
              });
            } }
          />

          <div className="slide-box primeiro">
            <div data-testid="0-recommendation-card" className="re-card">
              <p data-testid="0-recommendation-title">{meals[0].strMeal}</p>
              <img src={ meals[0].strMealThumb } alt={ meals[0].strMeal } />
            </div>
            <div data-testid="1-recommendation-card" className="re-card">
              <p data-testid="1-recommendation-title">{meals[1].strMeal}</p>
              <img src={ meals[1].strMealThumb } alt={ meals[1].strMeal } />
            </div>
          </div>
          <div className="slide-box">
            <div data-testid="2-recommendation-card" className="re-card" hidden>
              <p data-testid="2-recommendation-title">{meals[2].strMeal}</p>
              <img src={ meals[2].strMealThumb } alt={ meals[2].strMeal } />
            </div>
            <div data-testid="3-recommendation-card" className="re-card" hidden>
              <p data-testid="3-recommendation-title">{meals[3].strMeal}</p>
              <img src={ meals[3].strMealThumb } alt={ meals[3].strMeal } />
            </div>
          </div>
          <div className="slide-box">
            <div data-testid="4-recommendation-card" className="re-card" hidden>
              <p data-testid="4-recommendation-title">{meals[4].strMeal}</p>
              <img src={ meals[4].strMealThumb } alt={ meals[4].strMeal } />
            </div>
            <div data-testid="5-recommendation-card" className="re-card" hidden>
              <p data-testid="5-recommendation-title">{meals[5].strMeal}</p>
              <img src={ meals[5].strMealThumb } alt={ meals[5].strMeal } />
            </div>
          </div>
          <div className="nav-auto">
            <div className="auto-btn1" />
            <div className="auto-btn2" />
            <div className="auto-btn3" />
          </div>

          <div className="nav-manual">
            <label htmlFor="radio1" className="manual-btn">{}</label>
            <label htmlFor="radio2" className="manual-btn">{}</label>
            <label htmlFor="radio3" className="manual-btn">{}</label>
          </div>
        </div>
      </section>
    );
  }

  if (drinks.length > 0) {
    return (
      <section className="slider">
        <h3>Recomendações</h3>
        <div className="slider-content">

          <input
            type="radio"
            name="btn-radio"
            id="radio1"
            onClick={ () => {
              const elements = document.getElementsByClassName('re-card');
              Array.from(elements).forEach((element) => {
                element.removeAttribute('hidden');
              });
            } }
          />
          <input
            type="radio"
            name="btn-radio"
            id="radio2"
            onClick={ () => {
              const elements = document.getElementsByClassName('re-card');
              Array.from(elements).forEach((element) => {
                element.removeAttribute('hidden');
              });
            } }
          />
          <input
            type="radio"
            name="btn-radio"
            id="radio3"
            onClick={ () => {
              const elements = document.getElementsByClassName('re-card');
              Array.from(elements).forEach((element) => {
                element.removeAttribute('hidden');
              });
            } }
          />
          <div className="slide-box primeiro">
            <div data-testid="0-recommendation-card">
              <p data-testid="0-recommendation-title">{drinks[0].strDrink}</p>
              <img src={ drinks[0].strDrinkThumb } alt={ drinks[0].strDrink } />
            </div>
            <div data-testid="1-recommendation-card">
              <p data-testid="1-recommendation-title">{drinks[1].strDrink}</p>
              <img src={ drinks[1].strDrinkThumb } alt={ drinks[1].strDrink } />
            </div>
          </div>
          <div className="slide-box">
            <div data-testid="2-recommendation-card" className="re-card" hidden>
              <p data-testid="2-recommendation-title">{drinks[2].strDrink}</p>
              <img src={ drinks[2].strDrinkThumb } alt={ drinks[2].strDrink } />
            </div>
            <div data-testid="3-recommendation-card" className="re-card" hidden>
              <p data-testid="3-recommendation-title">{drinks[3].strDrink}</p>
              <img src={ drinks[3].strDrinkThumb } alt={ drinks[3].strDrink } />
            </div>
          </div>
          <div className="slide-box">
            <div data-testid="4-recommendation-card" className="re-card" hidden>
              <p data-testid="4-recommendation-title">{drinks[4].strDrink}</p>
              <img src={ drinks[4].strDrinkThumb } alt={ drinks[4].strDrink } />
            </div>
            <div data-testid="5-recommendation-card" className="re-card" hidden>
              <p data-testid="5-recommendation-title">{drinks[5].strDrink}</p>
              <img src={ drinks[5].strDrinkThumb } alt={ drinks[5].strDrink } />
            </div>
          </div>

          <div className="nav-auto">
            <div className="auto-btn1" />
            <div className="auto-btn2" />
            <div className="auto-btn3" />
          </div>

          <div className="nav-manual">
            <label htmlFor="radio1" className="manual-btn">{}</label>
            <label htmlFor="radio2" className="manual-btn">{}</label>
            <label htmlFor="radio3" className="manual-btn">{}</label>
          </div>

        </div>
      </section>

    );
  }
}
