import { TOrderActions } from 'services/actions/order'
import {
  ADD_TO_ORDER,
  SET_BUN,
  CLOSE_ORDER_MODAL,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  REMOVE_FROM_ORDER,
  MOVE_INGREDIENT,
} from 'services/constants/order'
import { IIngredient, IIngredientWithUUID } from 'services/types'

export interface IOrderState {
  cart: ReadonlyArray<IIngredientWithUUID>
  bun: IIngredient | null
  isModalOpen: boolean
  orderId: number | null
  orderRequest: boolean
  orderFailed: boolean
  orderError: string
}

const initialState: IOrderState = {
  cart: [],
  bun: null,
  isModalOpen: false,
  orderId: null,
  orderRequest: false,
  orderFailed: false,
  orderError: '',
}

export const orderReducer = (
  state: IOrderState = initialState,
  action: TOrderActions,
): IOrderState => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
        orderError: '',
      }
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderError: action.error,
      }
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...initialState,
        orderId: action.order.number,
        isModalOpen: true,
      }
    }
    case ADD_TO_ORDER: {
      return {
        ...state,
        cart: [...state.cart, action.ingredient],
      }
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        isModalOpen: false,
      }
    }
    case SET_BUN: {
      return {
        ...state,
        bun: action.bun,
      }
    }
    case REMOVE_FROM_ORDER: {
      const newCart = [...state.cart]
      newCart.splice(action.idx, 1)
      return {
        ...state,
        cart: newCart,
      }
    }
    case MOVE_INGREDIENT: {
      const cart = [...state.cart]
      const item = { ...cart[action.from] }
      cart.splice(action.from, 1)
      cart.splice(action.to, 0, item)
      return {
        ...state,
        cart: cart,
      }
    }
    default: {
      return state
    }
  }
}
