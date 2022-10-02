import PropTypes from 'prop-types'

import { IngredientCard } from 'components'
import { ingredient } from 'utils/prop-types'

import ingredientsSectionStyles from './ingredients-section.module.scss'

const IngredientsSection = ({
  name,
  ingredients,
  sectionRef,
  type,
  addItemToCart,
  openDetails,
}) => {
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
                onClick={addItemToCart(ingredient)}
                openDetails={openDetails(ingredient)}
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
  ingredients: PropTypes.arrayOf(ingredient).isRequired,
  sectionRef: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  openDetails: PropTypes.func.isRequired,
}

export default IngredientsSection
