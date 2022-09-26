import { INGREDIENTS_URL } from 'utils/constants'

const checkResponse = response =>
  response.ok ? response.json() : Promise.reject(`Error: ${response.status}`)

export const getIngredients = () => fetch(INGREDIENTS_URL).then(checkResponse)
