import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'

import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Price } from 'components'

import orderTileStyles from './order-tile.module.scss'
import { INGREDIENT_TYPES } from 'utils/constants'

const OrderTile = ({
  order: { name, number, createdAt, status, ingredients: orderIngredientsIds },
  full,
}) => {
  const history = useHistory()
  const location = useLocation()

  const ingredients = useSelector(store => store.ingredients.items)
  const orderIngredients = useMemo(
    () => ingredients.filter(({ _id }) => orderIngredientsIds.includes(_id)),
    [ingredients, orderIngredientsIds],
  )
  const count = orderIngredients.length

  const openModal = useCallback(
    () =>
      history.push({
        pathname: `${location.pathname}/${number}`,
        state: { background: location },
      }),
    [history, location],
  )

  const bunPrice = useMemo(
    () =>
      orderIngredients.find(
        ingredient => ingredient.type === INGREDIENT_TYPES.BUN,
      )?.price ?? 0,
    [orderIngredients],
  )
  const totalPrice = useMemo(
    () =>
      bunPrice + orderIngredients.reduce((acc, item) => acc + item.price, 0),
    [bunPrice, orderIngredients],
  )

  return (
    <div
      className={`${orderTileStyles.container} ${
        full ? orderTileStyles['container_full'] : ''
      } p-6`}
      onClick={openModal}
    >
      <h2 className='text text_color_primary text_type_digits-default mb-6'>
        {`#${number}`}
      </h2>
      <p
        className={`${orderTileStyles.date} text text_color_inactive text_type_main-default`}
      >
        <FormattedDate
          date={new Date(createdAt)}
          className='pr-2'
        />
        i-GMT+3
      </p>
      <h3
        className={`${
          orderTileStyles.name
        } text text_color_primary text_type_main-medium ${
          full ? 'mb-2' : 'mb-6'
        }`}
      >
        {name}
      </h3>
      {full && (
        <p
          className={`${orderTileStyles.status} text text_color_primary text_type_main-default mb-6`}
        >
          {status}
        </p>
      )}
      <div className={orderTileStyles.images}>
        {count > 6 && (
          <p
            className={`text text_color_primary text_type_main-default ${orderTileStyles.counter}`}
          >
            {`+${count - 6}`}
          </p>
        )}
        {orderIngredients
          .slice(0, 6)
          .reverse()
          .map((item, i) => (
            <div
              className={`${orderTileStyles['image-container']} mb-1 mt-1`}
              key={uuidv4()}
            >
              <img
                src={item.image_mobile}
                alt='Ingredient pic'
                className={orderTileStyles.image}
              />
            </div>
          ))}
      </div>
      <Price
        value={totalPrice}
        className={orderTileStyles.price}
      />
    </div>
  )
}

export default OrderTile
