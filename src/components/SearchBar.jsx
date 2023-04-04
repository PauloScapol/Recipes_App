export default function SearchBar() {
  return (
    <div>

      <div>
        <label htmlFor="ingredientSeach">
          <input
            type="radio"
            id="ingredientSeach"
            data-testid="ingredient-search-radio"
            name="radioButton"
          />
          <span>Ingredient</span>
        </label>

        <label htmlFor="nameSearch">
          <input
            type="radio"
            id="nameSearch"
            data-testid="name-search-radio"
            name="radioButton"
          />
          <span>Name</span>
        </label>

        <label htmlFor="firstLetterSearch">
          <input
            type="radio"
            id="firstLetterSearch"
            data-testid="first-letter-search-radio"
            name="radioButton"
          />
          <span>First Letter</span>
        </label>
      </div>

      <button
        type="button"
        data-testid="exec-search-btn"
      >
        SEARCH
      </button>

    </div>
  );
}
