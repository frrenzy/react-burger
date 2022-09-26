import { useState, useEffect } from 'react'

import {
  AppHeader,
  BurgerIngredients,
  BurgerConstructor,
  Section,
} from 'components'

import { API_URL, INGREDIENT_TYPES } from 'utils/constants'

import styles from './app.module.scss'

const App = () => {
  const [ingredients, setIngredients] = useState({
    ingredients: [],
    bun: '',
  })

  useEffect(() => {
    const getIngredients = () =>
      fetch(API_URL)
        .then(res =>
          res.ok ? res.json() : Promise.reject(`Error: ${res.status}`),
        )
        .then(data => {
          setIngredients({
            ingredients: data.data.map(item => ({
              ...item,
              count: 0,
            })),
            bun: '',
          })
        })
        .catch(console.log)

    getIngredients()
  }, [])

  const deleteItemFromCart = _id => () => {
    setIngredients({
      ingredients: ingredients.ingredients.map(item => {
        if (item._id === _id) {
          return {
            ...item,
            count: 0,
          }
        }
        return item
      }),
      bun: ingredients.bun,
    })
  }

  const addItemToCart = ({ _id, type }) => {
    if (type !== INGREDIENT_TYPES.BUN) {
      return () => {
        setIngredients({
          ingredients: ingredients.ingredients.map(item => {
            if (item._id === _id) {
              return {
                ...item,
                count: item.count + 1,
              }
            }
            return item
          }),
          bun: ingredients.bun,
        })
      }
    } else {
      return () => {
        setIngredients({
          ingredients: ingredients.ingredients.map(item => {
            if (item._id === _id) {
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
          bun: _id,
        })
      }
    }
  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Section>
          <BurgerIngredients
            ingredients={ingredients.ingredients}
            addItemToCart={addItemToCart}
          />
        </Section>
        <Section>
          <BurgerConstructor
            ingredients={ingredients}
            deleteItemFromCart={deleteItemFromCart}
          />
        </Section>
      </main>
    </>
  )
}

export default App
