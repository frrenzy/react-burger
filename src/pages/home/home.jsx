import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import BasePage from '../base'
import { BurgerIngredients, BurgerConstructor, Section } from 'components'

import { getIngredients } from 'services/actions/ingredients'

const HomePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <BasePage>
      <Section>
        <BurgerIngredients />
      </Section>
      <Section>
        <BurgerConstructor />
      </Section>
    </BasePage>
  )
}

export default HomePage
