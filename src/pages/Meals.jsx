import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const maxMeals = 12;

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();

      setMeals(data.meals.slice(0, maxMeals));
    };

    fetchMeals();
  }, []);

  return (
    <>
      <Header title="Meals" showSearchIcon />
      <div>
        {meals.map((meal, index) => (
          <div
            key={ meal.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { meal.strMeal }
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
