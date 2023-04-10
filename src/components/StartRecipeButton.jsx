export default function StartRecipeButton() {
  const recipeSituation = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (recipeSituation) {
    return (
      <div>
        <button
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
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
      >
        Start Recipe

      </button>
    </div>
  );
}
