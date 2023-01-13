import { useEffect, useMemo, FC } from 'react'
import { useDispatch, useSelector } from 'hooks'
import { useLocation, useParams } from 'react-router-dom'

import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Loading, Price } from 'components'

import {
  WSConnectionEndAction,
  WSConnectionStartAction,
} from 'services/actions/feed'

import { getCookie } from 'utils/helpers'
import {
  ALL_ORDERS_URL,
  USER_ORDERS_URL,
  RUSSIAN_ORDER_STATUSES,
  ORDER_STATUS_COLORS,
} from 'utils/constants'
import { IOrder, IIngredient } from 'services/types'
import { IngredientType } from 'services/types/data'

import orderInfoStyles from './order-info.module.scss'

const OrderInfo: FC<{}> = () => {
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string }>()
  const { pathname, state } = useLocation()

  useEffect(() => {
    const url = pathname.startsWith('/profile')
      ? `${USER_ORDERS_URL}${getCookie('token')}`
      : ALL_ORDERS_URL
    dispatch(WSConnectionStartAction(url))

    if (!state) {
      return () => dispatch(WSConnectionEndAction())
    } else {
      return () => {}
    }
  }, [dispatch, pathname, state])

  const orders: ReadonlyArray<IOrder> = useSelector(store => store.feed.orders)
  const order = useMemo<IOrder>(
    () => orders.find(({ number }) => number === parseInt(id))!,
    [orders, id],
  )
  const usedIngredients: IIngredient[] = useSelector(store =>
    store.ingredients.items.filter(({ _id }) =>
      order?.ingredients.includes(_id),
    ),
  )

  const orderWithCount = useMemo<IIngredient[]>(
    () =>
      order?.ingredients.reduce((acc: IIngredient[], item) => {
        const index: number = acc.findIndex(
          ({ _id }: IIngredient) => _id === item,
        )
        if (index === -1) {
          const ingredient: IIngredient = usedIngredients.find(
            ({ _id }) => _id === item,
          )!
          acc.push({ ...ingredient, count: 1 })
        } else {
          acc[index].count += 1
        }
        return acc
      }, []),
    [order?.ingredients, usedIngredients],
  )

  const total = useMemo<number>(
    () =>
      orderWithCount?.reduce(
        (acc, { price, count }) => acc + (price ?? 0) * count,
        0,
      ),
    [orderWithCount],
  )

  return !order ? (
    <Loading />
  ) : (
    <div className={`${orderInfoStyles.container} mt-10 mb-10`}>
      <h2
        className={`text text_color_primary text_type_digits-default mb-10 ${orderInfoStyles.number}`}
      >
        {`#${order.number}`}
      </h2>
      <h4
        className={`${orderInfoStyles.name} text text_color_primary text_type_main-medium mb-3`}
      >
        {order.name}
      </h4>
      <p
        className={`text text_color_${
          ORDER_STATUS_COLORS[order.status]
        } text_type_main-default mb-15`}
      >
        {RUSSIAN_ORDER_STATUSES[order.status]}
      </p>
      <p className='text text_color_primary text_type_main-medium mb-6'>
        Состав:
      </p>
      <div className={`${orderInfoStyles.images} mb-10`}>
        {orderWithCount.map(
          ({ _id, name, type, count, price, image_mobile }) => (
            <div
              className={`${orderInfoStyles['image-container']} mb-6 pr-6`}
              key={_id}
            >
              <img
                src={image_mobile}
                alt=''
                className={orderInfoStyles.image}
              />
              <p
                className={`${orderInfoStyles.name} text text_color_primary text_type_main-default`}
              >
                {`${name}`}
              </p>
              <Price
                value={`${type === IngredientType.Bun ? 2 : count} x ${price}`}
              />
            </div>
          ),
        )}
      </div>
      <div className={orderInfoStyles.total}>
        <p
          className={`${orderInfoStyles.date} text text_color_inactive text_type_main-default`}
        >
          <FormattedDate
            date={new Date()}
            className='pr-2'
          />
          i-GMT+3
        </p>
        <Price
          value={total}
          className={orderInfoStyles.price}
        />
      </div>
    </div>
  )
}

export default OrderInfo
