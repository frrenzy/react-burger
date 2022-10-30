import PropTypes from 'prop-types'

import { IngredientCard } from 'components'

import ingredientsSectionStyles from './ingredients-section.module.scss'
import { useSelector } from 'react-redux'

const IngredientsSection = ({ name, sectionRef, type }) => {
  const ingredients = useSelector(store =>
    store.ingredients.items.filter(ingredient => ingredient.type === type),
  )

  return (
    <section>
      <h2
        className={`${ingredientsSectionStyles.heading} text text_type_main-medium`}
        ref={sectionRef(type)}
      >
        {name}
      </h2>
      <ul className={`${ingredientsSectionStyles.list} pt-6 pr-4 pl-4 pb-10`}>
        {ingredients.length > 0 ? (
          ingredients.map(ingredient => (
            <li key={ingredient._id}>
              <IngredientCard
                ingredient={ingredient}
                // onClick={addToCart(ingredient)}
              />
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
  type: PropTypes.string.isRequired,
}

export default IngredientsSection
