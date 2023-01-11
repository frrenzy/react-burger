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

export interface IUser {
  name: string
  email: string
}

export interface IGetIngredientsResponse {
  success: boolean
  data: IIngredientRaw[]
}

export interface IUserResponse {
  success: boolean
  user: IUser
}

export interface IUserEditResponse extends IUserResponse {}

export interface ILoginResponse {
  success: boolean
  accessToken: string
  refreshToken: string
  user: IUser
}

export interface IRegisterResponse extends ILoginResponse {}

export interface ILogoutResponse {
  success: boolean
  message: string
}

export interface IResetEmailResponse extends ILogoutResponse {}

export interface IResetPasswordResponse extends ILogoutResponse {}

export interface ITokenResponse {
  success: boolean
  accessToken: string
  refreshToken: string
}

export interface IResponseSuccess {}

export interface IResponseError {
  status: number
  message: string
}
