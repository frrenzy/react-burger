import { useState } from 'react'

import { AppHeader, BurgerIngredients } from 'components'

import { ingredients, initialCart } from 'utils/data'

import styles from './app.module.scss'

const App = () => {
  const [cart, setCart] = useState(initialCart.length > 0 ? initialCart : [])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients
          ingredients={ingredients}
          cart={cart}
          updateCart={setCart}
        />
      </main>
    </>
  )
}

export default App
