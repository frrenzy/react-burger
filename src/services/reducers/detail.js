import { SET_DETAIL, RESET_DETAIL } from 'services/actions/detail'

const initialState = {
  ingredient: null,
  isModalOpen: false,
}

export const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAIL: {
      return {
        ...state,
        ingredient: action.ingredient,
        isModalOpen: true,
      }
    }
    case RESET_DETAIL: {
      return initialState
    }
    default: {
      return state
    }
  }
}
