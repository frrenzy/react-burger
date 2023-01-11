import { IIngredientRaw, IOrderRaw } from 'services/types/data'

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
