import { useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDrag } from 'react-dnd'

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { Price } from 'components'

import { DRAG_TYPES } from 'utils/constants'
import { ingredient as ingredientType } from 'utils/prop-types'

import ingredientCardStyles from './ingredient-card.module.scss'

const IngredientCard = ({ ingredient }) => {
  const location = useLocation()
  const history = useHistory()
  const [{ isDragged }, dragRef] = useDrag({
    type: DRAG_TYPES.INGREDIENT,
    item: ingredient,
    collect: monitor => ({
      isDragged: monitor.isDragging(),
    }),
  })

  const openModal = useCallback(
    () =>
      history.push({
        pathname: `/ingredients/${ingredient._id}`,
        state: { background: location },
      }),
    [history],
  )

  return (
    <figure
      className={`${ingredientCardStyles.figure} ${
        isDragged ? `${ingredientCardStyles.figure_dragged}` : ''
      }`}
    >
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={`mr-4 ml-4 mb-1 ${ingredientCardStyles.image}`}
        onClick={openModal}
        ref={dragRef}
      />
      {ingredient.count > 0 && (
        <Counter
          size='default'
          count={ingredient.count}
        />
      )}
      <figcaption className={ingredientCardStyles.caption}>
        <Price value={ingredient.price} />
        <p
          className={`text text_type_main-default text_color_primary ${ingredientCardStyles.paragraph}`}
        >
          {ingredient.name}
        </p>
      </figcaption>
    </figure>
  )
}

IngredientCard.propTypes = {
  ingredient: ingredientType.isRequired,
}

export default IngredientCard
