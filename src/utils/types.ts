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

export type TIngredient = {
  _id: string
  name: string
  type: IngredientType
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
  count: number
}

export interface IOrder {
  name: string
  number: number
  createdAt: string
  ingredients: string[]
  status: string
  updatedAt: string
  _id: string
}
