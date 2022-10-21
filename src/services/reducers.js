import { INGREDIENT_TYPES } from 'utils/constants'

export const ingredientsReducer = (state, { type, payload }) => {
  switch (type) {
    case 'set': {
      return {
        ingredients: payload.ingredients,
        bun: '',
      }
    }
    case 'selectBun': {
      return {
        ingredients: state.ingredients.map(item => {
          if (item._id === payload._id) {
            return {
              ...item,
              count: 1,
            }
          }
          if (item.type === INGREDIENT_TYPES.BUN) {
            return {
              ...item,
              count: 0,
            }
          }
          return item
        }),
        bun: payload._id,
      }
    }
    case 'addToCart': {
      return {
        ingredients: state.ingredients.map(item => {
          if (item._id === payload._id) {
            return {
              ...item,
              count: item.count + 1,
            }
          }
          return item
        }),
        bun: state.bun,
      }
    }
    case 'deleteFromCart': {
      return {
        ingredients: state.ingredients.map(item => {
          if (item._id === payload._id) {
            return {
              ...item,
              count: item.count - 1,
            }
          }
          return item
        }),
        bun: state.bun,
      }
    }
    default: {
      return 'aboba'
    }
  }
}

export const totalReducer = (state, { type, payload }) => {
  switch (type) {
    case 'add': {
      return {
        total: state.total + payload.price,
      }
    }
    case 'delete': {
      return {
        total: state.total - payload.price,
      }
    }
    default: {
      return 'aboba'
    }
  }
}
