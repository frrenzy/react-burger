import { TWSActions } from 'services/actions/feed'
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from 'services/constants/feed'
import { IOrder } from 'services/types/data'

export interface IFeedState {
  wsConnected: boolean
  orders: ReadonlyArray<IOrder>
  total: number | null
  totalToday: number | null
}

const initialState: IFeedState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null,
}

export const feedReducer = (
  state: IFeedState = initialState,
  action: TWSActions,
): IFeedState => {
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
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      }
    default:
      return state
  }
}
