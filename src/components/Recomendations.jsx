import { useEffect, useState } from 'react';
import '../styles/Recomendations.css';

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
    console.log(data);
    setMeals(data.meals);
  };
  useEffect(() => {
    fetchDrinks();
    fetchMeals();
  }, []);
  const [position, setPosition] = useState(0);
  const itemWidth = 100 + 10; // largura do item + margem direita

  const handleClickPrev = () => {
    let newPosition = position + itemWidth;
    if (newPosition > 0) {
      newPosition = -((meals.length - 1) * itemWidth);
    }
    setPosition(newPosition);
  };

  const handleClickNext = () => {
    let newPosition = position - itemWidth;
    if (newPosition < -((meals.length - 1) * itemWidth)) {
      newPosition = 0;
    }
    setPosition(newPosition);
  };

  if (meals.length > 0) {
    console.log('entrou');
    return (
      <div className="carousel-div">
        <div className="carousel" style={ { transform: `translateX(${position}px)` } }>
          {meals.length > 0 && meals.map((item, index) => (
            <div key={ index }>
              <p>{item.strMeal}</p>
              <img src={ item.strMealThumb } alt={ item.strMeal } />
            </div>
          ))}
          <button className="carousel-prev" onClick={ handleClickPrev }>&#10094;</button>
          <button className="carousel-next" onClick={ handleClickNext }>&#10095;</button>
        </div>
      </div>
    );
  }
}
