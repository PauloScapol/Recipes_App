import { useEffect, useState } from 'react';

export default function Recomendations() {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
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
    fetchDrinks();
    fetchMeals();
  }, []);

  return (
    <div>
      <h1>Recomendations</h1>
      <p>
        {meals.length > 0 && meals[0].strMeal}
        {' '}
      </p>
      <p>
        {drinks.length > 0 && drinks[0].strDrink}
        {' '}
      </p>
    </div>
  );
}
