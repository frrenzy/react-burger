import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { socketMiddleware } from './middleware'

import { rootReducer } from 'services/reducers'
import {
  WSConnectionClosedAction,
  WSConnectionEndAction,
  WSConnectionErrorAction,
  WSConnectionStartAction,
  WSConnectionSuccessAction,
  WSGetMessageAction,
} from 'services/actions/feed'

export interface IWSActions {
  wsInit: typeof WSConnectionStartAction
  wsClose: typeof WSConnectionEndAction
  onOpen: typeof WSConnectionSuccessAction
  onClose: typeof WSConnectionClosedAction
  onError: typeof WSConnectionErrorAction
  onMessage: typeof WSGetMessageAction
}

const wsActions: IWSActions = {
  wsInit: WSConnectionStartAction,
  wsClose: WSConnectionEndAction,
  onOpen: WSConnectionSuccessAction,
  onClose: WSConnectionClosedAction,
  onError: WSConnectionErrorAction,
  onMessage: WSGetMessageAction,
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
    applyMiddleware(socketMiddleware(wsActions)),
  ),
)
