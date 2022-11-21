import { createOrderRequest } from 'api'
import { RESET_COUNTERS } from './ingredients'

export const ADD_TO_ORDER = 'ADD_TO_ORDER'
export const REMOVE_FROM_ORDER = 'REMOVE_FROM_ORDER'
export const SET_BUN = 'SET_BUN'
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL'
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST'
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS'
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED'
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT'

export const createOrder = ids => {
  return dispatch => {
    dispatch({ type: CREATE_ORDER_REQUEST })
    createOrderRequest(ids)
      .then(order => {
        dispatch({ type: CREATE_ORDER_SUCCESS, order: order })
        dispatch({ type: RESET_COUNTERS })
      })
      .catch(error => dispatch({ type: CREATE_ORDER_FAILED, error }))
  }
}
