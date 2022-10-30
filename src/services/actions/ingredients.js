import { getIngredientsRequest } from 'api'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const getIngredients = () => {
  return dispatch => {
    dispatch({ type: GET_INGREDIENTS_REQUEST })
    getIngredientsRequest()
      .then(res => dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: res.data }))
      .catch(error => dispatch({ type: GET_INGREDIENTS_FAILED, error }))
  }
}
