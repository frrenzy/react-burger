import {
  ADD_TO_ORDER,
  SET_BUN,
  CLOSE_ORDER_MODAL,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  REMOVE_FROM_ORDER,
  MOVE_INGREDIENT,
} from 'services/actions/order'

const initialState = {
  cart: [],
  bun: null,
  isModalOpen: false,
  orderId: null,
  orderRequest: false,
  orderFailed: false,
  orderError: '',
}

export const orderReducer = (state = initialState, action) => {
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
        ...state,
        orderRequest: false,
        orderId: action.order.order.number,
        cart: [],
        isModalOpen: true,
        bun: '',
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
