import { INGREDIENTS_URL, ORDERS_URL } from 'utils/constants'

const checkResponse = response =>
  response.ok ? response.json() : Promise.reject(`Error: ${response.status}`)

export const getIngredients = () => fetch(INGREDIENTS_URL).then(checkResponse)
export const createOrder = ids =>
  fetch(ORDERS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients: ids }),
  }).then(checkResponse)
