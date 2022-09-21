import { useState } from 'react'

import {
  AppHeader,
  BurgerIngredients,
  BurgerConstructor,
  Section,
} from 'components'

import { ingredients, initialCart } from 'utils/data'

import styles from './app.module.scss'

const App = () => {
  const [cart, setCart] = useState(initialCart.length > 0 ? initialCart : [])

  const updateCart = _id => () => {
    setCart(cart.filter(item => item._id !== _id))
  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Section>
          <BurgerIngredients
            ingredients={ingredients}
            cart={cart}
            updateCart={updateCart}
          />
        </Section>
        <Section>
          <BurgerConstructor
            cart={cart}
            updateCart={updateCart}
          />
        </Section>
      </main>
    </>
  )
}

export default App
