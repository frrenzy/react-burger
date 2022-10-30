import {
  ADD_TO_ORDER,
  CLOSE_ORDER_MODAL,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  OPEN_MODAL,
} from 'services/actions/order'

const initialState = {
  cart: [],
  name: '',
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
        name: action.order.name,
        orderId: action.order.order.number,
      }
    }
    case ADD_TO_ORDER: {
      const cart = state.cart
      cart.push(action.id)
      return {
        ...state,
        cart,
      }
    }
    case OPEN_MODAL: {
      return {
        ...state,
        isModalOpen: true,
      }
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        isModalOpen: false,
      }
    }
    default: {
      return state
    }
  }
}
