import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

export default function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const maxDrinks = 12;

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();

      setDrinks(data.drinks.slice(0, maxDrinks));
    };

    fetchDrinks();
  }, []);

  return (
    <>
      <Header title="Drinks" showSearchIcon />
      <div>
        {drinks.map((drink, index) => (
          <div
            key={ drink.idDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { drink.strDrink }
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
