import { API_URL } from './constants'

const checkResponse = response =>
  response.ok ? response.json() : Promise.reject(`Error: ${response.status}`)

export const getIngredients = () => fetch(API_URL).then(checkResponse)
