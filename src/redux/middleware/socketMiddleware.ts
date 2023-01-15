import { Middleware } from 'redux'
import { AppDispatch, RootState, TAppActions } from 'services/types'

import { IWSActions } from '../store'
import { IOrderWSRaw } from 'services/types/data'

export const socketMiddleware =
  (wsActions: IWSActions): Middleware<{}, RootState, AppDispatch> =>
  store => {
    let socket: WebSocket | null = null
    const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions

    return next => (action: TAppActions) => {
      const { dispatch } = store
      const { type } = action

      if (type === wsInit(new URL('')).type) {
        const { url } = action
        if (!socket || socket.readyState === 3) {
          socket = new WebSocket(url)
        } else if (socket.url !== url.href) {
          socket.close()
          socket = new WebSocket(url)
        }
      } else if (type === wsClose().type) {
        socket?.close()
      }
      if (socket) {
        socket.addEventListener('open', event => dispatch(onOpen(event)))

        socket.addEventListener('close', event => dispatch(onClose(event)))

        socket.addEventListener('error', event => dispatch(onError(event)))

        socket.addEventListener('message', (event: MessageEvent<string>) => {
          const { data } = event
          const parsedData: IOrderWSRaw = JSON.parse(data)
          const { success, ...restParsedData } = parsedData

          dispatch(onMessage(restParsedData))
        })
      }

      next(action)
    }
  }
