import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Meals() {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const maxMeals = 12;
  const maxMealsCategories = 5;

  useEffect(() => {
    async function getMealsCategories() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategories(data.meals.slice(0, maxMealsCategories)); // salva as 5 primeiras categorias
    }

    getMealsCategories();
  }, []);

  async function filterMealsByCategory(categoryName) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
    const data = await response.json();
    setMeals(data.meals);
  }

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
      {categories.map((category) => (
        <button
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => filterMealsByCategory(category.strCategory) }
        >
          {category.strCategory}
        </button>
      ))}
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
