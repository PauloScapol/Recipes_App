import { ingredientApi, nameApi, firstLetterApi } from '../../services/ingredientApi';

export const SAVE_SEARCH = 'SAVE_SEARCH';

export const actionSearch = (info) => ({
  type: SAVE_SEARCH,
  payload: info,
});

export const searchIngredient = (searchInput) => async (dispatch) => {
  const ingredientResponse = await ingredientApi(searchInput);
  dispatch(actionSearch(ingredientResponse));
};

export const searchName = (searchInput) => async (dispatch) => {
  const nameResponse = await nameApi(searchInput);
  dispatch(actionSearch(nameResponse));
};

export const searchFirstLetter = (searchInput) => async (dispatch) => {
  const firstLetterResponse = await firstLetterApi(searchInput);
  dispatch(actionSearch(firstLetterResponse));
};
