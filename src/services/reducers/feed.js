import {
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from 'services/actions/feed'

const initialState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null,
}

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      }
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      }
    case WS_GET_MESSAGE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
