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
export const INGREDIENTS_URL = `${API_BASE_URL}/ingredients`
export const ORDERS_URL = `${API_BASE_URL}/orders`
