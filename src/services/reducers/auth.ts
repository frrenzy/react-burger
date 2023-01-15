import { TAuthActions } from 'services/actions/auth'
import {
  LOGOUT,
  USER_REQUEST,
  USER_REQUEST_FAILED,
  USER_REQUEST_SUCCESS,
} from 'services/constants/auth'

import { IUser } from 'services/types/data'

export interface IAuthState {
  user: IUser | null
  userRequest: boolean
  userFailed: boolean
  userError: string
}

const initialState: IAuthState = {
  user: null,
  userRequest: false,
  userFailed: false,
  userError: '',
}

export const authReducer = (
  state: IAuthState = initialState,
  action: TAuthActions,
): IAuthState => {
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
