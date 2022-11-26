import { BasePage } from 'pages'
import { BurgerIngredients, BurgerConstructor, Section } from 'components'

const HomePage = () => {

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
