import { useState, useEffect, useReducer } from 'react'

import {
  AppHeader,
  BurgerIngredients,
  BurgerConstructor,
  Section,
} from 'components'

import { INGREDIENT_TYPES } from 'utils/constants'
import { getIngredients } from 'api'

import styles from './app.module.scss'
import { IngredientsContext, TotalContext } from 'services/appContext'

const App = () => {
  const ingredientsReducer = (state, { type, payload }) => {
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

  const totalReducer = (state, { type, payload }) => {
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

  const [ingredientsState, ingredientsDispatcher] = useReducer(
    ingredientsReducer,
    {
      ingredients: [],
      bun: '',
    },
    undefined,
  )

  const [totalState, totalDispatcher] = useReducer(
    totalReducer,
    { total: 0 },
    undefined,
  )

  useEffect(() => {
    const getIngredientsList = () =>
      getIngredients()
        .then(data => {
          ingredientsDispatcher({
            type: 'set',
            payload: {
              ingredients: data.data.map(item => ({
                ...item,
                count: 0,
              })),
            },
          })
        })
        .catch(console.error)

    getIngredientsList()
  }, [])

  const addToCart = ({ _id, type, price }) => {
    if (type === INGREDIENT_TYPES.BUN) {
      return () => {
        const oldBunPrice =
          ingredientsState.ingredients.find(
            ingredient => ingredient._id === ingredientsState.bun,
          )?.price ?? 0
        ingredientsDispatcher({ type: 'selectBun', payload: { _id: _id } })
        totalDispatcher({
          type: 'add',
          payload: { price: 2 * (price - oldBunPrice) },
        })
      }
    } else {
      return () => {
        ingredientsDispatcher({ type: 'addToCart', payload: { _id: _id } })
        totalDispatcher({ type: 'add', payload: { price: price } })
      }
    }
  }

  return (
    <IngredientsContext.Provider
      value={{ ingredientsState, ingredientsDispatcher }}
    >
      <TotalContext.Provider value={{ totalState, totalDispatcher }}>
        <AppHeader />
        <main className={styles.main}>
          <Section>
            <BurgerIngredients
              ingredients={ingredientsState.ingredients}
              addItemToCart={addToCart}
            />
          </Section>
          <Section>
            <BurgerConstructor />
          </Section>
        </main>
      </TotalContext.Provider>
    </IngredientsContext.Provider>
  )
}

export default App
