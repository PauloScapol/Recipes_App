import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Drinks() {
  const [categories, setCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // nova state para armazenar a categoria selecionada
  const maxDrinks = 12;
  const maxDrinksCategories = 5;

  useEffect(() => {
    async function getDrinksCategories() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategories(data.drinks.slice(0, maxDrinksCategories)); // salva as 5 primeiras categorias
    }

    getDrinksCategories();
  }, []);

  async function clearFilter() {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setDrinks(data.drinks.slice(0, maxDrinks));
    setSelectedCategory(null); // remove a categoria selecionada
  }

  async function filterDrinksByCategory(categoryName) {
    if (categoryName === selectedCategory) { // se o filtro for selecionado novamente
      clearFilter(); // limpa o filtro e exibe todas as receitas
    } else {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`);
      const data = await response.json();

      setDrinks(data.drinks.slice(0, maxDrinks));
      setSelectedCategory(categoryName); // atualiza a categoria selecionada
    }
  }

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
      <button
        key="All"
        data-testid="All-category-filter"
        onClick={ clearFilter } // adiciona a ação de limpar o filtro
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => filterDrinksByCategory(category.strCategory) }
          className={ category.strCategory === selectedCategory ? 'selected' : '' } // adiciona a classe "selected" para a categoria selecionada
        >
          {category.strCategory}
        </button>
      ))}
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
      <Footer />
    </>
  );
}
