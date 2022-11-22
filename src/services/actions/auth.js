import { authenticateUserRequest, logoutRequest, registerUserRequest } from 'api'
import { setCookie, deleteCookie } from 'utils/helpers'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_REQUEST_SUCCESS = 'USER_REQUEST_SUCCESS'
export const USER_REQUEST_FAILED = 'USER_REQUEST_FAILED'
export const LOGOUT = 'LOGOUT'

export const registerUser = userInfo => {
  return dispatch => {
    dispatch({ type: USER_REQUEST })
    registerUserRequest(userInfo)
      .then(res => {
        setCookie('token', res.accessToken.split('Bearer ')[1])
        sessionStorage.setItem('refreshToken', res.refreshToken)
        dispatch({ type: USER_REQUEST_SUCCESS, user: res.user })
      })
      .catch(error => dispatch({ type: USER_REQUEST_FAILED, error }))
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
      .catch(error => dispatch({ type: USER_REQUEST_FAILED, error }))
  }
}

export const signOut = () => {
  return dispatch => {
    dispatch({ type: USER_REQUEST })
    logoutRequest()
      .then(res => {
        dispatch({ type: LOGOUT })
        deleteCookie('token')
        sessionStorage.removeItem('refreshToken')
      })
      .catch(error => dispatch({ type: USER_REQUEST_FAILED, error }))
  }
}
