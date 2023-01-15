import {
  WS_CONNECTION_START,
  WS_CONNECTION_END,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from 'services/constants/feed'
import { TOrderWS } from 'services/types/data'

export interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START
  readonly url: URL
}

export interface IWSConnectionEndAction {
  readonly type: typeof WS_CONNECTION_END
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS
  readonly payload: Event
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR
  readonly payload: Event
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED
  readonly payload: Event
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE
  readonly payload: TOrderWS
}

export type TWSActions =
  | IWSConnectionStartAction
  | IWSConnectionEndAction
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction

export const WSConnectionStartAction = (
  url: URL,
): IWSConnectionStartAction => ({
  type: WS_CONNECTION_START,
  url,
})

export const WSConnectionEndAction = (): IWSConnectionEndAction => ({
  type: WS_CONNECTION_END,
})

export const WSConnectionSuccessAction = (
  payload: Event,
): IWSConnectionSuccessAction => ({
  type: WS_CONNECTION_SUCCESS,
  payload,
})

export const WSConnectionErrorAction = (
  payload: Event,
): IWSConnectionErrorAction => ({
  type: WS_CONNECTION_ERROR,
  payload,
})

export const WSConnectionClosedAction = (
  payload: Event,
): IWSConnectionClosedAction => ({
  type: WS_CONNECTION_CLOSED,
  payload,
})

export const WSGetMessageAction = (payload: TOrderWS): IWSGetMessageAction => ({
  type: WS_GET_MESSAGE,
  payload,
})
