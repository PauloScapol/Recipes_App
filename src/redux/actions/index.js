import { ingredientApi, nameApi, firstLetterApi } from '../../services/ingredientApi';
import {
  ingredientDrinkApi,
  nameDrinkApi,
  firstLetterDrinkApi,
} from '../../services/drinksApi';

export const SAVE_SEARCH = 'SAVE_SEARCH';

export const actionSearch = (info) => ({
  type: SAVE_SEARCH,
  payload: info,
});

export const searchIngredient = (searchInput) => async (dispatch) => {
  const ingredientResponse = await ingredientApi(searchInput);
  dispatch(actionSearch(ingredientResponse));
};
//

export const searchName = (searchInput) => async (dispatch) => {
  const nameResponse = await nameApi(searchInput);
  dispatch(actionSearch(nameResponse));
};

export const searchFirstLetter = (searchInput) => async (dispatch) => {
  const firstLetterResponse = await firstLetterApi(searchInput);
  dispatch(actionSearch(firstLetterResponse));
};

// DRINKS
export const searchDrinkIngredient = (searchInput) => async (dispatch) => {
  const ingredientDrinkResponse = await ingredientDrinkApi(searchInput);
  dispatch(actionSearch(ingredientDrinkResponse));
};

export const searchDrinkName = (searchInput) => async (dispatch) => {
  const nameDrinkResponse = await nameDrinkApi(searchInput);
  dispatch(actionSearch(nameDrinkResponse));
};

export const searchDrinkFirstLetter = (searchInput) => async (dispatch) => {
  const firstLetterDrinkResponse = await firstLetterDrinkApi(searchInput);
  dispatch(actionSearch(firstLetterDrinkResponse));
};
