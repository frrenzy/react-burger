import {
  checkResponse,
  checkResponseSuccess,
  composeHeaders,
  setCookie,
} from 'utils/helpers'

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

import {
  IGetIngredientsResponse,
  ILoginResponse,
  ILogoutResponse,
  IRegisterResponse,
  ITokenResponse,
  IUserEditResponse,
  IUserResponse,
} from 'utils/types/api'

type IRequestMethods = 'POST' | 'PATCH' | 'DELETE'

interface IFetchOptions {
  method?: IRequestMethods
  body?: string
}

const request = (url: string, options: IFetchOptions = {}) =>
  fetch(url, { ...options, headers: composeHeaders() })
    .then(checkResponse)
    .then(checkResponseSuccess)

const requestWithRefreshToken = (url: string, options: IFetchOptions = {}) =>
  request(url, options)
    .catch(res =>
      res.status === 401 || res.status === 403
        ? refreshTokenRequest()
        : Promise.reject(res.message),
    )
    .then(res => request(url, options))

export const getIngredientsRequest = (): Promise<IGetIngredientsResponse> =>
  request(INGREDIENTS_URL)

export const createOrderRequest = (ids: string[]) =>
  request(ORDERS_URL, {
    method: 'POST',
    body: JSON.stringify({ ingredients: ids }),
  })

export const sendResetEmailRequest = (email: { email: string }) =>
  request(RESET_PASSWORD_URL, {
    method: 'POST',
    body: JSON.stringify(email),
  })

export const resetPasswordRequest = (data: {
  code: string
  password: string
}) =>
  request(RESET_PASSWORD_NEW_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const registerUserRequest = (user: {
  name: string
  email: string
  password: string
}): Promise<IRegisterResponse> =>
  request(REGISTER_URL, {
    method: 'POST',
    body: JSON.stringify(user),
  })

export const authenticateUserRequest = (credentials: {
  email: string
  password: string
}): Promise<ILoginResponse> =>
  request(AUTHORIZATION_URL, {
    method: 'POST',
    body: JSON.stringify(credentials),
  })

export const refreshTokenRequest = (): Promise<void> => {
  const token = sessionStorage.getItem('refreshToken')
  return request(TOKEN_URL, {
    method: 'POST',
    body: JSON.stringify({ token }),
  }).then((res: ITokenResponse) => {
    const SECONDS_IN_MINUTE = 60
    setCookie('token', res.accessToken.split('Bearer ')[1], {
      expires: 15 * SECONDS_IN_MINUTE,
    })
    sessionStorage.setItem('refreshToken', res.refreshToken)
  })
}

export const logoutRequest = (): Promise<ILogoutResponse> => {
  const token = sessionStorage.getItem('refreshToken')
  return request(LOGOUT_URL, {
    method: 'POST',
    body: JSON.stringify({ token }),
  })
}

export const getUserRequest = (): Promise<IUserResponse> =>
  requestWithRefreshToken(USER_URL)

export const editUserRequest = (form: {
  name: string
  email: string
  password: string
}): Promise<IUserEditResponse> =>
  requestWithRefreshToken(USER_URL, {
    method: 'PATCH',
    body: JSON.stringify(form),
  })
