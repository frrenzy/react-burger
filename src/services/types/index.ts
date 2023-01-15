import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { IIngredientRaw, IOrderRaw } from 'services/types/data'
import { TIngredientsActions } from 'services/actions/ingredients'
import { TWSActions } from 'services/actions/feed'
import { TOrderActions } from 'services/actions/order'
import { TAuthActions } from 'services/actions/auth'
import { rootReducer } from 'services/reducers'

export type RootState = ReturnType<typeof rootReducer>

export type TAppActions =
  | TIngredientsActions
  | TWSActions
  | TOrderActions
  | TAuthActions

export type AppThunk<R = void> = ThunkAction<R, RootState, never, TAppActions>

export type AppDispatch = ThunkDispatch<RootState, never, TAppActions>

export enum DragType {
  Ingredient = 'Ingredient',
  Tile = 'Tile',
}

export enum TileType {
  Top = 'top',
  Center = 'center',
  Bottom = 'bottom',
}

export interface IIngredient extends IIngredientRaw {
  count: number
}

export interface IIngredientWithUUID extends IIngredient {
  uuid: string
}

export interface IOrder
  extends Omit<IOrderRaw, 'owner' | 'price' | 'ingredients'> {
  ingredients: string[]
}
