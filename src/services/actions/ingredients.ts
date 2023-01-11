import { getIngredientsRequest } from 'api'

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_TAB,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  RESET_COUNTERS,
} from 'services/constants/ingredients'
import { IIngredientRaw, IngredientType } from 'services/types/data'

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS
  readonly ingredients: ReadonlyArray<IIngredientRaw>
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED
  readonly error: string
}

export interface ISetTabAction {
  readonly type: typeof SET_TAB
  readonly tab: IngredientType
}

export interface IIncreaseCounterAction {
  readonly type: typeof INCREASE_COUNTER
  readonly ingredientType: IngredientType
  readonly _id: string
}

export interface IDecreaseCounterAction {
  readonly type: typeof DECREASE_COUNTER
  readonly _id: string
}

export interface IResetCountersAction {
  readonly type: typeof RESET_COUNTERS
}

export type TIngredientsActions =
  | IGetIngredientsAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | ISetTabAction
  | IIncreaseCounterAction
  | IDecreaseCounterAction
  | IResetCountersAction

export const getIngredientsAction = (): IGetIngredientsAction => ({
  type: GET_INGREDIENTS_REQUEST,
})

export const getIngredientsSuccessAction = (
  ingredients: ReadonlyArray<IIngredientRaw>,
): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients,
})

export const getIngredientsFailedAction = (
  error: string,
): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED,
  error,
})

export const setTabAction = (tab: IngredientType): ISetTabAction => ({
  type: SET_TAB,
  tab,
})

export const increaseCounterAction = (
  ingredientType: IngredientType,
  _id: string,
): IIncreaseCounterAction => ({ type: INCREASE_COUNTER, ingredientType, _id })

export const decreaseCounterAction = (_id: string): IDecreaseCounterAction => ({
  type: DECREASE_COUNTER,
  _id,
})

export const resetCountersAction = (): IResetCountersAction => ({
  type: RESET_COUNTERS,
})

export const getIngredientsThunk: any = () => (dispatch: any) => {
  dispatch(getIngredientsAction())
  getIngredientsRequest()
    .then(res => dispatch(getIngredientsSuccessAction(res.data)))
    .catch(error => dispatch(getIngredientsFailedAction(error)))
}
