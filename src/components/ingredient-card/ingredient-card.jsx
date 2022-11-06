import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useDrag } from 'react-dnd'

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { Price } from 'components'

import { SET_DETAIL } from 'services/actions/detail'

import { ingredient as ingredientType } from '../../utils/prop-types'

import ingredientCardStyles from './ingredient-card.module.scss'
import { DRAG_TYPES } from 'utils/constants'

const IngredientCard = ({ ingredient }) => {
  const dispatch = useDispatch()
  const onClick = useCallback(
    () => dispatch({ type: SET_DETAIL, ingredient }),
    [dispatch, ingredient],
  )

  const [{ isDragged }, dragRef] = useDrag({
    type: DRAG_TYPES.INGREDIENT,
    item: ingredient,
    collect: monitor => ({
      isDragged: monitor.isDragging(),
    }),
  })

  return (
    <>
      <figure
        className={`${ingredientCardStyles.figure} ${
          isDragged ? `${ingredientCardStyles.figure_dragged}` : ''
        }`}
        ref={dragRef}
      >
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={`mr-4 ml-4 mb-1 ${ingredientCardStyles.image}`}
          onClick={onClick}
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
    </>
  )
}

IngredientCard.propTypes = {
  ingredient: ingredientType.isRequired,
}

export default IngredientCard
