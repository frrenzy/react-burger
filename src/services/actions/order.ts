import { createOrderRequest } from 'api'
import { resetCountersAction } from './ingredients'
import {
  AppDispatch,
  AppThunk,
  IIngredient,
  IIngredientWithUUID,
} from 'services/types'
import { ICreateOrderResponse, IOrderRaw } from 'services/types/data'

import {
  ADD_TO_ORDER,
  CLOSE_ORDER_MODAL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_SUCCESS,
  MOVE_INGREDIENT,
  REMOVE_FROM_ORDER,
  SET_BUN,
} from 'services/constants/order'
import { ICreateOrderForm } from 'services/types/forms'

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

export const createOrderThunk: AppThunk =
  (ingredients: ICreateOrderForm) => (dispatch: AppDispatch) => {
    dispatch(createOrderAction())
    createOrderRequest(ingredients)
      .then(({ order }: ICreateOrderResponse) => {
        dispatch(createOrderSuccessAction(order))
        dispatch(resetCountersAction())
      })
      .catch((error: string) => dispatch(createOrderFailedAction(error)))
  }
