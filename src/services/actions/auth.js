import {
  authenticateUserRequest,
  editUserRequest,
  getUserRequest,
  logoutRequest,
  registerUserRequest,
} from 'api'
import { setCookie, deleteCookie } from 'utils/helpers'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_REQUEST_SUCCESS = 'USER_REQUEST_SUCCESS'
export const USER_REQUEST_FAILED = 'USER_REQUEST_FAILED'
export const LOGOUT = 'LOGOUT'
export const RESET_PROFILE = 'RESET_PROFILE'

export const registerUser = userInfo => {
  return dispatch => {
    dispatch({ type: USER_REQUEST })
    registerUserRequest(userInfo)
      .then(res => {
        setCookie('token', res.accessToken.split('Bearer ')[1])
        sessionStorage.setItem('refreshToken', res.refreshToken)
        dispatch({ type: USER_REQUEST_SUCCESS, user: res.user })
      })
      .catch(error =>
        dispatch({ type: USER_REQUEST_FAILED, error: error.message })
      )
  }
}

export const signIn = credentials => {
  return dispatch => {
    dispatch({ type: USER_REQUEST })
    authenticateUserRequest(credentials)
      .then(res => {
        setCookie('token', res.accessToken.split('Bearer ')[1])
        sessionStorage.setItem('refreshToken', res.refreshToken)
        dispatch({ type: USER_REQUEST_SUCCESS, user: res.user })
      })
      .catch(error =>
        dispatch({ type: USER_REQUEST_FAILED, error: error.message }),
      )
  }
}

export const getUser = () => {
  return dispatch => {
    dispatch({ type: USER_REQUEST })
    getUserRequest()
      .then(res => {
        dispatch({ type: USER_REQUEST_SUCCESS, user: res.user })
      })
      .catch(error =>
        dispatch({ type: USER_REQUEST_FAILED, error: error.message }),
      )
  }
}

export const editUser = form => {
  return dispatch => {
    dispatch({ type: USER_REQUEST })
    editUserRequest(form)
      .then(res => dispatch({ type: USER_REQUEST_SUCCESS, user: res.user }))
      .catch(error =>
        dispatch({ type: USER_REQUEST_FAILED, error: error.message }),
      )
  }
}

export const signOut = () => {
  return dispatch => {
    dispatch({ type: USER_REQUEST })
    logoutRequest()
      .then(res => {
        dispatch({ type: LOGOUT })
        deleteCookie('token')
      })
      .catch(error =>
        dispatch({ type: USER_REQUEST_FAILED, error: error.message }),
      )
      .finally(res => sessionStorage.removeItem('refreshToken'))
  }
}
