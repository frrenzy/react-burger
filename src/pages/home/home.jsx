import { BasePage } from 'pages'
import { BurgerIngredients, BurgerConstructor, Section } from 'components'

const HomePage = () => {

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
