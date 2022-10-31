import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_TAB,
} from 'services/actions/ingredients'

const initialState = {
  items: [],
  currentTab: '',
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsError: '',
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsError: '',
        ingredientsFailed: false,
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        items: action.ingredients,
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsError: action.error,
      }
    }
    case SET_TAB: {
      return {
        ...state,
        currentTab: action.tab
      }
    }
    default: {
      return state
    }
  }
}
