const ORDER_STATUSES = {
  DONE: 'done',
  CREATED: 'created',
  CANCELLED: 'cancelled',
  PENDING: 'pending',
}

export const RUSSIAN_ORDER_STATUSES = {
  [ORDER_STATUSES.CREATED] : 'Создан',
  [ORDER_STATUSES.PENDING] : 'Готовится',
  [ORDER_STATUSES.DONE] : 'Выполнен',
  [ORDER_STATUSES.CANCELLED] : 'Отменён',
}

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUSES.CANCELLED] : 'error',
  [ORDER_STATUSES.DONE] : 'success',
  [ORDER_STATUSES.PENDING] : 'primary',
  [ORDER_STATUSES.CREATED] : 'primary',
}

const API_BASE_URL: string = 'https://norma.nomoreparties.space/api'
const WS_BASE_URL: string = 'wss://norma.nomoreparties.space/orders'

export const INGREDIENTS_URL: string = `${API_BASE_URL}/ingredients`
export const ORDERS_URL: string = `${API_BASE_URL}/orders`

export const RESET_PASSWORD_URL: string = `${API_BASE_URL}/password-reset`
export const RESET_PASSWORD_NEW_URL: string = `${API_BASE_URL}/password-reset/reset`

export const REGISTER_URL: string = `${API_BASE_URL}/auth/register`
export const AUTHORIZATION_URL: string = `${API_BASE_URL}/auth/login`
export const TOKEN_URL: string = `${API_BASE_URL}/auth/token`
export const LOGOUT_URL: string = `${API_BASE_URL}/auth/logout`
export const USER_URL: string = `${API_BASE_URL}/auth/user`

export const ALL_ORDERS_URL: string = `${WS_BASE_URL}/all`
export const USER_ORDERS_URL: string = `${WS_BASE_URL}?token=`
