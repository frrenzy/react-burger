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
  ICreateOrderResponse,
  IGetIngredientsResponse,
  ILoginResponse,
  ILogoutResponse,
  IRegisterResponse,
  IResetEmailResponse,
  IResetPasswordResponse,
  ITokenResponse,
  IUserEditResponse,
  IUserResponse,
} from 'services/types/data'

type IRequestMethods = 'POST' | 'PATCH' | 'DELETE'

interface IFetchOptions {
  method?: IRequestMethods
  body?: string
}

const request = <T extends object>(
  url: string,
  options: IFetchOptions = {},
): Promise<T> =>
  fetch(url, { ...options, headers: composeHeaders() })
    .then(checkResponse)
    .then(checkResponseSuccess)

const requestWithRefreshToken = <T extends {}>(
  url: string,
  options: IFetchOptions = {},
): Promise<T> =>
  request<T>(url, options)
    .catch(res =>
      res.status === 401 || res.status === 403
        ? refreshTokenRequest()
        : Promise.reject(res.message),
    )
    .then(res => request(url, options))

export const getIngredientsRequest = () =>
  request<IGetIngredientsResponse>(INGREDIENTS_URL)

export const createOrderRequest = (ids: string[]) =>
  request<ICreateOrderResponse>(ORDERS_URL, {
    method: 'POST',
    body: JSON.stringify({ ingredients: ids }),
  })

export const sendResetEmailRequest = (email: { email: string }) =>
  request<IResetEmailResponse>(RESET_PASSWORD_URL, {
    method: 'POST',
    body: JSON.stringify(email),
  })

export const resetPasswordRequest = (data: {
  code: string
  password: string
}) =>
  request<IResetPasswordResponse>(RESET_PASSWORD_NEW_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const registerUserRequest = (user: {
  name: string
  email: string
  password: string
}) =>
  request<IRegisterResponse>(REGISTER_URL, {
    method: 'POST',
    body: JSON.stringify(user),
  })

export const authenticateUserRequest = (credentials: {
  email: string
  password: string
}) =>
  request<ILoginResponse>(AUTHORIZATION_URL, {
    method: 'POST',
    body: JSON.stringify(credentials),
  })

export const refreshTokenRequest = () => {
  const token = sessionStorage.getItem('refreshToken')
  return request<ITokenResponse>(TOKEN_URL, {
    method: 'POST',
    body: JSON.stringify({ token }),
  }).then((value: ITokenResponse) => {
    const SECONDS_IN_MINUTE = 60
    setCookie('token', value.accessToken.split('Bearer ')[1], {
      expires: 15 * SECONDS_IN_MINUTE,
    })
    sessionStorage.setItem('refreshToken', value.refreshToken)
  })
}

export const logoutRequest = () => {
  const token = sessionStorage.getItem('refreshToken')
  return request<ILogoutResponse>(LOGOUT_URL, {
    method: 'POST',
    body: JSON.stringify({ token }),
  })
}

export const getUserRequest = () =>
  requestWithRefreshToken<IUserResponse>(USER_URL)

export const editUserRequest = (form: {
  name: string
  email: string
  password: string
}) =>
  requestWithRefreshToken<IUserEditResponse>(USER_URL, {
    method: 'PATCH',
    body: JSON.stringify(form),
  })
