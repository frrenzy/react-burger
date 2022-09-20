import PropTypes from 'prop-types'

import { IngredientCard } from 'components'

import ingredientsSectionStyles from './ingredients-section.module.scss'

const IngredientsSection = ({ name, ingredients, sectionRef, type }) => {
  return (
    <section>
      <h2
        className={`${ingredientsSectionStyles.heading} text text_type_main-medium`}
        ref={sectionRef(type)}
      >
        {name}
      </h2>
      <ul className={`${ingredientsSectionStyles.list} pt-6 pr-4 pl-4 pb-10`}>
        {ingredients.length ? (
          ingredients.map(({ image, name, price, _id }) => (
            <li key={_id}>
              <IngredientCard
                image={image}
                name={name}
                price={price}
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
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  sectionRef: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

export default IngredientsSection
