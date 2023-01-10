import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_TAB,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  RESET_COUNTERS,
} from 'services/actions/ingredients'
import { IngredientType } from 'utils/types'

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
        items: action.ingredients.map(item => ({
          ...item,
          count: 0,
        })),
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
        currentTab: action.tab,
      }
    }
    case INCREASE_COUNTER: {
      if (action.ingredientType === IngredientType.Bun) {
        return {
          ...state,
          items: [...state.items].map(item => {
            if (item.type !== IngredientType.Bun) {
              return item
            } else if (item._id === action._id) {
              return {
                ...item,
                count: 1,
              }
            } else {
              return { ...item, count: 0 }
            }
          }),
        }
      } else {
        return {
          ...state,
          items: [...state.items].map(item =>
            item._id === action._id ? { ...item, count: item.count + 1 } : item,
          ),
        }
      }
    }
    case DECREASE_COUNTER: {
      return {
        ...state,
        items: [...state.items].map(item =>
          item._id === action._id ? { ...item, count: item.count - 1 } : item,
        ),
      }
    }
    case RESET_COUNTERS: {
      return {
        ...state,
        items: [...state.items].map(item => ({ ...item, count: 0 })),
      }
    }
    default: {
      return state
    }
  }
}
