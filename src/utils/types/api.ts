import { IngredientType } from '.'

export interface IIngredientRaw {
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
}

export interface IResponseError {
  status: number
  message: string
}

export interface IGetIngredientsResponse {
  success: boolean
  data: IIngredientRaw[]
}

export interface IResponseSuccess {}
