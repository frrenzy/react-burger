import { checkResponse, composeHeaders } from 'utils/helpers'

import {
  AUTHORIZATION_URL,
  INGREDIENTS_URL,
  LOGOUT_URL,
  ORDERS_URL,
  REGISTER_URL,
  RESET_PASSWORD_NEW_URL,
  RESET_PASSWORD_URL,
  TOKEN_URL,
  USER_URL,
} from 'utils/constants'

const request = (url, options) => fetch(url, options).then(checkResponse)

export const getIngredientsRequest = () => request(INGREDIENTS_URL)

export const createOrderRequest = ids =>
  request(ORDERS_URL, {
    method: 'POST',
    headers: composeHeaders(),
    body: JSON.stringify({ ingredients: ids }),
  })

export const sendResetEmailRequest = email =>
  request(RESET_PASSWORD_URL, {
    method: 'POST',
    headers: composeHeaders(),
    body: JSON.stringify({ email }),
  })

export const resetPasswordRequest = data =>
  request(RESET_PASSWORD_NEW_URL, {
    method: 'POST',
    headers: composeHeaders(),
    body: JSON.stringify(data),
  })

export const registerUserRequest = user =>
  request(REGISTER_URL, {
    method: 'POST',
    headers: composeHeaders(),
    body: JSON.stringify(user),
  })

export const authenticateUserRequest = credentials =>
  request(AUTHORIZATION_URL, {
    method: 'POST',
    headers: composeHeaders(),
    body: JSON.stringify(credentials),
  })

export const refreshTokenRequest = () => {
  const token = sessionStorage.getItem('refreshToken')
  request(TOKEN_URL, {
    method: 'POST',
    headers: composeHeaders(token),
    body: JSON.stringify({ token }),
  })
}

export const logoutRequest = () => {
  const token = '' //TODO change to cookie
  request(LOGOUT_URL, {
    method: 'POST',
    headers: composeHeaders(),
    body: JSON.stringify({ token }),
  })
}

export const getUserRequest = () => {
  const token = '' //TODO change to cookie
  request(USER_URL, { headers: composeHeaders(token) })
}
