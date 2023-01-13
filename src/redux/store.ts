import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { socketMiddleware } from './middleware'

import { rootReducer } from 'services/reducers'

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
    applyMiddleware(socketMiddleware),
  ),
)
