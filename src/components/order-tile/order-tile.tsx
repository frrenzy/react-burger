import { useCallback, useMemo, FC } from 'react'
import { useSelector } from 'hooks'
import { useHistory, useLocation } from 'react-router-dom'

import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Price } from 'components'

import { RUSSIAN_ORDER_STATUSES, ORDER_STATUS_COLORS } from 'utils/constants'
import { IOrder, IIngredient } from 'services/types'
import { IngredientType } from 'services/types/data'

import orderTileStyles from './order-tile.module.scss'

interface IOrderTileProps {
  order: IOrder
  full: boolean
}

const OrderTile: FC<IOrderTileProps> = ({
  order: { name, number, createdAt, status, ingredients: orderIngredientsIds },
  full,
}) => {
  const history = useHistory()
  const location = useLocation()

  const ingredients: ReadonlyArray<IIngredient> = useSelector(
    store => store.ingredients.items,
  )
  const orderIngredients = useMemo<IIngredient[]>(
    () => ingredients.filter(({ _id }) => orderIngredientsIds.includes(_id)),
    [ingredients, orderIngredientsIds],
  )
  const count = orderIngredients.length

  const openModal = useCallback<() => void>(
    () =>
      history.push({
        pathname: `${location.pathname}/${number}`,
        state: { background: location },
      }),
    [history, location, number],
  )

  const bunPrice = useMemo<number>(
    () =>
      orderIngredients.find(({ type }) => type === IngredientType.Bun)?.price ??
      0,
    [orderIngredients],
  )
  const totalPrice = useMemo<number>(
    () =>
      bunPrice + orderIngredients.reduce((acc, { price }) => acc + price, 0),
    [bunPrice, orderIngredients],
  )

  return (
    <li
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
          className={`${orderTileStyles.status} text text_color_${ORDER_STATUS_COLORS[status]} text_type_main-default mb-6`}
        >
          {RUSSIAN_ORDER_STATUSES[status]}
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
          .map(({ _id, image_mobile }) => (
            <div
              className={`${orderTileStyles['image-container']} mb-1 mt-1`}
              key={_id}
            >
              <img
                src={image_mobile}
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
    </li>
  )
}

export default OrderTile
