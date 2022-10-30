import { createOrderRequest } from 'api'

export const ADD_TO_ORDER = 'ADD_TO_ORDER'
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL'
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST'
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS'
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED'

export const createOrder = ids => {
  return dispatch => {
    dispatch({ type: CREATE_ORDER_REQUEST })
    createOrderRequest(ids)
      .then(res => dispatch({ type: CREATE_ORDER_SUCCESS, order: res }))
      .catch(error => dispatch({ type: CREATE_ORDER_FAILED, error }))
  }
}
