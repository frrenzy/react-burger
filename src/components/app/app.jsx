import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
  AppHeader,
  BurgerIngredients,
  BurgerConstructor,
  Section,
} from 'components'
import { getIngredients } from 'services/actions/ingredients'

import styles from './app.module.scss'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Section>
          <BurgerIngredients />
        </Section>
        <Section>
          <BurgerConstructor />
        </Section>
      </main>
    </>
  )
}

export default App
