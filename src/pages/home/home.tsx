import { FC } from 'react'

import { BurgerIngredients, BurgerConstructor, Section } from 'components'

const HomePage: FC<{}> = () => {
  return (
    <>
      <Section>
        <BurgerIngredients />
      </Section>
      <Section>
        <BurgerConstructor />
      </Section>
    </>
  )
}

export default HomePage
