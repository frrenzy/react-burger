import { createOrderRequest } from 'api'
import { resetCountersAction } from './ingredients'
import { IIngredient, IIngredientWithUUID } from 'services/types'
import { IOrderRaw } from 'services/types/data'

export const ADD_TO_ORDER = 'ADD_TO_ORDER'
export const REMOVE_FROM_ORDER = 'REMOVE_FROM_ORDER'
export const SET_BUN = 'SET_BUN'
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL'
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST'
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS'
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED'
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT'

export interface IAddToOrderAction {
  readonly type: typeof ADD_TO_ORDER
  readonly ingredient: IIngredientWithUUID
}

export interface IRemoveFromOrderAction {
  readonly type: typeof REMOVE_FROM_ORDER
  readonly idx: number
}

export interface ISetBunAction {
  readonly type: typeof SET_BUN
  readonly bun: IIngredient
}

export interface ICloseOrderModalAction {
  readonly type: typeof CLOSE_ORDER_MODAL
}

export interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT
  readonly from: number
  readonly to: number
}

export interface ICreateOrderAction {
  readonly type: typeof CREATE_ORDER_REQUEST
}

export interface ICreateOrderSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS
  readonly order: IOrderRaw
}

export interface ICreateOrderFailedAction {
  readonly type: typeof CREATE_ORDER_FAILED
  readonly error: string
}

export type TOrderActions =
  | IAddToOrderAction
  | IRemoveFromOrderAction
  | ISetBunAction
  | ICloseOrderModalAction
  | IMoveIngredientAction
  | ICreateOrderAction
  | ICreateOrderSuccessAction
  | ICreateOrderFailedAction

export const addToOrderAction = (
  ingredient: IIngredientWithUUID,
): IAddToOrderAction => ({
  type: ADD_TO_ORDER,
  ingredient,
})

export const removeFromOrderAction = (idx: number): IRemoveFromOrderAction => ({
  type: REMOVE_FROM_ORDER,
  idx,
})

export const setBunAction = (bun: IIngredient): ISetBunAction => ({
  type: SET_BUN,
  bun,
})

export const closeOrderModalAction = (): ICloseOrderModalAction => ({
  type: CLOSE_ORDER_MODAL,
})

export const moveIngredientAction = (
  from: number,
  to: number,
): IMoveIngredientAction => ({ type: MOVE_INGREDIENT, from, to })

export const createOrderAction = (): ICreateOrderAction => ({
  type: CREATE_ORDER_REQUEST,
})

export const createOrderSuccessAction = (
  order: IOrderRaw,
): ICreateOrderSuccessAction => ({ type: CREATE_ORDER_SUCCESS, order })

export const createOrderFailedAction = (
  error: string,
): ICreateOrderFailedAction => ({ type: CREATE_ORDER_FAILED, error })

export const createOrder: any = (ids: string[]) => (dispatch: any) => {
  dispatch({ type: CREATE_ORDER_REQUEST })
  createOrderRequest(ids)
    .then(order => {
      dispatch({ type: CREATE_ORDER_SUCCESS, order: order })
      dispatch(resetCountersAction())
    })
    .catch(error => dispatch({ type: CREATE_ORDER_FAILED, error }))
}
