import { INGREDIENTS_URL, ORDERS_URL } from 'utils/constants'

const checkResponse = response =>
  response.ok ? response.json() : Promise.reject(`Error: ${response.status}`)

const request = (url, options) => fetch(url, options).then(checkResponse)

export const getIngredientsRequest = () => request(INGREDIENTS_URL)
export const createOrder = ids =>
  request(ORDERS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients: ids }),
  })
