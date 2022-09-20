import { AppHeader, BurgerIngredients } from 'components'

import { ingredients } from 'utils/data'

import styles from './app.module.scss'

const App = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} />
      </main>
    </>
  )
}

export default App
