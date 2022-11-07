import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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
    <DndProvider backend={HTML5Backend}>
      <AppHeader />
      <main className={styles.main}>
        <Section>
          <BurgerIngredients />
        </Section>
        <Section>
          <BurgerConstructor />
        </Section>
      </main>
    </DndProvider>
  )
}

export default App
