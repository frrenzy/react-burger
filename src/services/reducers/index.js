import { combineReducers } from 'redux'

import { detailReducer } from './detail'
import { ingredientsReducer } from './ingredients'
import { orderReducer } from './order'
import { formsReducer } from './forms'
import { authReducer } from './auth'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  detail: detailReducer,
  order: orderReducer,
  auth: authReducer,
})
