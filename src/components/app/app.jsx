import { useState } from 'react'

import {
  AppHeader,
  BurgerIngredients,
  BurgerConstructor,
  Section,
} from 'components'

import { initialIngredients } from 'utils/data'

import styles from './app.module.scss'

const App = () => {
  let initialState
  if (initialIngredients.length === 0) {
    initialState = []
  } else {
    initialState = initialIngredients.map(item => ({
      ...item,
      count: Math.floor(Math.random() * 3),
    }))
  }

  const [ingredients, setIngredients] = useState(initialState)

  const deleteItemFromCart = _id => () => {
    setIngredients(
      ingredients.map(item => {
        if (item._id === _id) {
          return {
            ...item,
            count: 0,
          }
        }
        return item
      }),
    )
  }

  const addItemToCart = _id => () => {
    setIngredients(
      ingredients.map(item => {
        if (item._id === _id) {
          return {
            ...item,
            count: item.count + 1,
          }
        }
        return item
      }),
    )
  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Section>
          <BurgerIngredients
            ingredients={ingredients}
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
