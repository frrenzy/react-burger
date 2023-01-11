import { IIngredientRaw } from './api'

export enum IngredientType {
  Bun = 'bun',
  Sauce = 'sauce',
  Main = 'main',
}

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

export enum OrderStatuses {
  DONE = 'done',
  CREATED = 'created',
  CANCELLED = 'cancelled',
  PENDING = 'pending',
}

export interface IOrder {
  name: string
  number: number
  createdAt: string
  ingredients: string[]
  status: OrderStatuses
  updatedAt: string
  _id: string
}
