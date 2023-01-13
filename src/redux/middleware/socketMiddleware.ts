import { Middleware } from 'redux'
import {
  WSConnectionClosedAction,
  WSConnectionErrorAction,
  WSConnectionSuccessAction,
  WSGetMessageAction,
} from 'services/actions/feed'
import { WS_CONNECTION_END, WS_CONNECTION_START } from 'services/constants/feed'
import { AppDispatch, RootState, TAppActions } from 'services/types'
import { IOrderWSRaw } from 'services/types/data'

export const socketMiddleware: Middleware<
  {},
  RootState,
  AppDispatch
> = store => {
  let socket: WebSocket | null = null

  return next => (action: TAppActions) => {
    const { dispatch } = store
    const { type } = action

    if (type === WS_CONNECTION_START) {
      const { url } = action
      if (!socket || socket.readyState === 3) {
        socket = new WebSocket(`${url}`)
      } else if (socket.url !== url) {
        socket.close()
        socket = new WebSocket(`${url}`)
      }
    } else if (type === WS_CONNECTION_END) {
      socket?.close()
    }
    if (socket) {
      socket.addEventListener('open', event => {
        dispatch(WSConnectionSuccessAction(event))
      })

      socket.addEventListener('error', event => {
        dispatch(WSConnectionErrorAction(event))
      })

      socket.addEventListener('message', (event: MessageEvent<string>) => {
        const { data } = event
        const parsedData: IOrderWSRaw = JSON.parse(data)
        const { success, ...restParsedData } = parsedData

        dispatch(WSGetMessageAction(restParsedData))
      })

      socket.addEventListener('close', event => {
        dispatch(WSConnectionClosedAction(event))
      })
    }

    next(action)
  }
}
