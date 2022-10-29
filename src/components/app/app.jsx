import { useEffect, useReducer } from 'react'

import {
  AppHeader,
  BurgerIngredients,
  BurgerConstructor,
  Section,
} from 'components'

import { getIngredients } from 'api'
import { IngredientsContext, TotalContext } from 'services/appContext'
import { ingredientsReducer, totalReducer } from 'services/reducers'

import styles from './app.module.scss'

const App = () => {
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

  return (
    <IngredientsContext.Provider
      value={{ ingredientsState, ingredientsDispatcher }}
    >
      <TotalContext.Provider value={{ totalState, totalDispatcher }}>
        <AppHeader />
        <main className={styles.main}>
          <Section>
            <BurgerIngredients />
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
