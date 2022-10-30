import { combineReducers } from 'redux'
import { detailReducer } from './detail'

import { ingredientsReducer } from './ingredients'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  detail: detailReducer,
})
