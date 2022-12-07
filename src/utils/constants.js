export const INGREDIENT_TYPES = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main',
}

export const DRAG_TYPES = {
  INGREDIENT: 'INGREDIENT',
  TILE: 'TILE',
}

export const TILE_TYPES = {
  TOP: 'top',
  CENTER: 'center',
  BOTTOM: 'bottom',
}

const API_BASE_URL = 'https://norma.nomoreparties.space/api'
const WS_BASE_URL = 'wss://norma.nomoreparties.space/orders'

export const INGREDIENTS_URL = `${API_BASE_URL}/ingredients`
export const ORDERS_URL = `${API_BASE_URL}/orders`

export const RESET_PASSWORD_URL = `${API_BASE_URL}/password-reset`
export const RESET_PASSWORD_NEW_URL = `${API_BASE_URL}/password-reset/reset`

export const REGISTER_URL = `${API_BASE_URL}/auth/register`
export const AUTHORIZATION_URL = `${API_BASE_URL}/auth/login`
export const TOKEN_URL = `${API_BASE_URL}/auth/token`
export const LOGOUT_URL = `${API_BASE_URL}/auth/logout`
export const USER_URL = `${API_BASE_URL}/auth/user`

export const ALL_ORDERS_URL = `${WS_BASE_URL}/all`
export const USER_ORDERS_URL = `${WS_BASE_URL}?token=`
