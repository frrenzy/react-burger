import { combineReducers } from 'redux'

import { ingredientsReducer } from './ingredients'
import { orderReducer } from './order'
import { authReducer } from './auth'
import { feedReducer } from './feed'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  auth: authReducer,
  feed: feedReducer,
})
