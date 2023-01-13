import { OrderStatuses } from 'services/types/data'

export const RUSSIAN_ORDER_STATUSES = {
  [OrderStatuses.Created]: 'Создан',
  [OrderStatuses.Pending]: 'Готовится',
  [OrderStatuses.Done]: 'Выполнен',
  [OrderStatuses.Cancelled]: 'Отменён',
}

export const ORDER_STATUS_COLORS = {
  [OrderStatuses.Cancelled]: 'error',
  [OrderStatuses.Done]: 'success',
  [OrderStatuses.Pending]: 'primary',
  [OrderStatuses.Created]: 'primary',
}

const API_BASE_URL: URL = new URL('https://norma.nomoreparties.space')
const WS_BASE_URL: URL = new URL('wss://norma.nomoreparties.space')

export const INGREDIENTS_URL: URL = new URL('/api/ingredients', API_BASE_URL)
export const ORDERS_URL: URL = new URL('/api/orders', API_BASE_URL)

export const RESET_PASSWORD_URL: URL = new URL('/api/password-reset', API_BASE_URL)
export const RESET_PASSWORD_NEW_URL: URL = new URL(
  '/api/password-reset/reset',
  API_BASE_URL,
)

export const REGISTER_URL: URL = new URL('/api/auth/register', API_BASE_URL)
export const AUTHORIZATION_URL: URL = new URL('/api/auth/login', API_BASE_URL)
export const TOKEN_URL: URL = new URL('/api/auth/token', API_BASE_URL)
export const LOGOUT_URL: URL = new URL('/api/auth/logout', API_BASE_URL)
export const USER_URL: URL = new URL('/api/auth/user', API_BASE_URL)

export const ALL_ORDERS_URL: URL = new URL('/orders/all', WS_BASE_URL)
export const USER_ORDERS_URL: URL = new URL('/orders?token=', WS_BASE_URL)
