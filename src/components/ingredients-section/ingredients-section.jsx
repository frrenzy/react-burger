import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { IngredientCard } from 'components'

import ingredientsSectionStyles from './ingredients-section.module.scss'

const IngredientsSection = ({ name, sectionRef, headerRef, type }) => {
  const ingredients = useSelector(store =>
    store.ingredients.items.filter(ingredient => ingredient.type === type),
  )

  return (
    <section ref={sectionRef}>
      <h2
        ref={headerRef}
        className={`${ingredientsSectionStyles.heading} text text_type_main-medium`}
      >
        {name}
      </h2>
      <ul className={`${ingredientsSectionStyles.list} pt-6 pr-4 pl-4 pb-10`}>
        {ingredients.length > 0 ? (
          ingredients.map(ingredient => (
            <li key={ingredient._id}>
              <IngredientCard ingredient={ingredient} />
            </li>
          ))
        ) : (
          <p>Вариантов нет :(</p>
        )}
      </ul>
    </section>
  )
}

IngredientsSection.propTypes = {
  name: PropTypes.string.isRequired,
  sectionRef: PropTypes.func.isRequired,
  headerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  type: PropTypes.string.isRequired,
}

export default IngredientsSection
