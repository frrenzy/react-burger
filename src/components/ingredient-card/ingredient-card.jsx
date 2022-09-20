import PropTypes from 'prop-types'

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import { Price } from 'components'

import ingredientCardStyles from './ingredient-card.module.scss'

const IngredientCard = ({ image, name, price, count = 0 }) => {
  return (
    <figure className={ingredientCardStyles.figure}>
      <img
        src={image}
        alt={name}
        className={`mr-4 ml-4 mb-1 ${ingredientCardStyles.image}`}
      />
      {count > 0 && (
        <Counter
          size='default'
          count={count}
        />
      )}
      <figcaption className={ingredientCardStyles.caption}>
        <Price value={price} />
        <p
          className={`text text_type_main-default text_color_primary ${ingredientCardStyles.paragraph}`}
        >
          {name}
        </p>
      </figcaption>
    </figure>
  )
}

IngredientCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
}

export default IngredientCard
