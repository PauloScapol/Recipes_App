import { useHistory } from 'react-router-dom';

export default function StartRecipeButton(type) {
  const recipeSituation = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const history = useHistory();
  const url = Object.values(type);
  console.log(url[0]);

  // const redirect = () => {
  //   if (type.includes('meals')) {
  //     history.push('/in-progress');
  //   }
  // };

  if (recipeSituation) {
    return (
      <div>
        <button
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          onClick={ () => history.push(`${url[0]}/in-progress`) }
        >
          Continue Recipe
        </button>
      </div>
    );
  } return (
    <div>
      <button
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ () => history.push(`${url[0]}/in-progress`) }
      >
        Start Recipe

      </button>
    </div>
  );
}
