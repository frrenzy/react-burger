export enum OrderStatuses {
  Done = 'done',
  Created = 'created',
  Cancelled = 'cancelled',
  Pending = 'pending',
}

export enum IngredientType {
  Bun = 'bun',
  Sauce = 'sauce',
  Main = 'main',
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

export interface IOrderWSRaw {
  success: boolean
  orders: IOrder[]
  total: number
  totalToday: number
}

export type TOrderWS = Omit<IOrderWSRaw, 'success'>

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

export interface IOrderRaw {
  name: string
  number: number
  createdAt: string
  ingredients: IIngredientRaw[]
  status: OrderStatuses
  updatedAt: string
  _id: string
  price: number
  owner: IUser & { createdAt: string; updatedAt: string }
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

export interface ICreateOrderResponse {
  success: true
  name: string
  order: IOrderRaw
}

export type TAPIResponseSuccess =
  | IGetIngredientsResponse
  | IUserResponse
  | IUserEditResponse
  | ILoginResponse
  | ILogoutResponse
  | IResetPasswordResponse
  | IResetEmailResponse
  | ITokenResponse
  | ICreateOrderResponse

export type TAPIResponseErrorRaw = {
  status: number
  message: string
}

export type TAPIResponseError = TAPIResponseErrorRaw & { success: false }
