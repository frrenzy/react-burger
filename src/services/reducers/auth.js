import {
  LOGOUT,
  USER_REQUEST,
  USER_REQUEST_FAILED,
  USER_REQUEST_SUCCESS,
} from 'services/actions/auth'

const initialState = {
  user: null,
  userRequest: false,
  userFailed: false,
  userError: '',
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
        userFailed: false,
        userError: '',
      }
    }
    case USER_REQUEST_FAILED: {
      return {
        ...state,
        userRequest: false,
        userFailed: true,
        userError: action.error,
      }
    }
    case USER_REQUEST_SUCCESS: {
      return {
        ...state,
        user: action.user,
        userRequest: false,
        userFailed: false,
        userError: '',
      }
    }
    case LOGOUT: {
      return initialState
    }
    default: {
      return state
    }
  }
}
