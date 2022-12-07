export const socketMiddleware = wsActions => {
  return store => {
    let socket = null

    return next => action => {
      const { dispatch } = store
      const { type } = action
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions

      if (type === wsInit) {
        const { url } = action
        if (!socket) {
          socket = new WebSocket(`${url}`)
        } else if (socket.url !== url) {
          socket.close()
          socket = new WebSocket(`${url}`)
        }
      } else if (type === wsClose) {
        socket.close()
      }
      if (socket) {
        socket.addEventListener('open', event => {
          dispatch({ type: onOpen, payload: event })
        })

        socket.addEventListener('error', event => {
          dispatch({ type: onError, payload: event })
        })

        socket.addEventListener('message', event => {
          const { data } = event
          const parsedData = JSON.parse(data)
          const { success, ...restParsedData } = parsedData

          dispatch({ type: onMessage, payload: restParsedData })
        })

        socket.addEventListener('close', event => {
          dispatch({ type: onClose, payload: event })
        })
      }

      next(action)
    }
  }
}
