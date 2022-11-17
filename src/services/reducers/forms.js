import { SET_INPUT_VALUE } from 'services/actions/forms'

export const formsReducer = (state, action) => {
  switch (action.type) {
    case SET_INPUT_VALUE: {
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          [action.field]: action.value,
        },
      }
    }
    default: {
      return state
    }
  }
}
