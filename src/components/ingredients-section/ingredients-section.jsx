import { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

import { IngredientCard } from 'components'

import { IngredientsContext, TotalContext } from 'services/appContext'
import { INGREDIENT_TYPES } from 'utils/constants'

import ingredientsSectionStyles from './ingredients-section.module.scss'

const IngredientsSection = ({ name, sectionRef, type, openDetails }) => {
  const { ingredientsState, ingredientsDispatcher } =
    useContext(IngredientsContext)
  const { totalDispatcher } = useContext(TotalContext)

  const ingredients = useMemo(
    () =>
      ingredientsState.ingredients.filter(
        ingredient => ingredient.type === type,
      ),
    [ingredientsState, type],
  )

  const addToCart = ({ _id, type, price }) => {
    if (type === INGREDIENT_TYPES.BUN) {
      return () => {
        const oldBunPrice =
          ingredientsState.ingredients.find(
            ingredient => ingredient._id === ingredientsState.bun,
          )?.price ?? 0
        ingredientsDispatcher({ type: 'selectBun', payload: { _id: _id } })
        totalDispatcher({
          type: 'add',
          payload: { price: 2 * (price - oldBunPrice) },
        })
      }
    } else {
      return () => {
        ingredientsDispatcher({ type: 'addToCart', payload: { _id: _id } })
        totalDispatcher({ type: 'add', payload: { price: price } })
      }
    }
  }

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
                onClick={addToCart(ingredient)}
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
  sectionRef: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  openDetails: PropTypes.func.isRequired,
}

export default IngredientsSection
