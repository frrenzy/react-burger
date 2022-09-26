import PropTypes from 'prop-types'

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import { Price } from 'components'
import { ingredient } from '../../utils/prop-types'

import ingredientCardStyles from './ingredient-card.module.scss'

const IngredientCard = ({ ingredient, onClick, openDetails }) => {
  return (
    <>
      <figure className={ingredientCardStyles.figure}>
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={`mr-4 ml-4 mb-1 ${ingredientCardStyles.image}`}
          onClick={openDetails}
        />
        {ingredient.count > 0 && (
          <Counter
            size='default'
            count={ingredient.count}
          />
        )}
        <figcaption
          className={ingredientCardStyles.caption}
          onClick={onClick}
        >
          <Price value={ingredient.price} />
          <p
            className={`text text_type_main-default text_color_primary ${ingredientCardStyles.paragraph}`}
          >
            {ingredient.name}
          </p>
        </figcaption>
      </figure>
    </>
  )
}

IngredientCard.propTypes = {
  ingredient: ingredient.isRequired,
  onClick: PropTypes.func.isRequired,
  openDetails: PropTypes.func.isRequired,
}

export default IngredientCard
