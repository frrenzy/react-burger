import { useEffect, useMemo, FC } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Loading, OrderTile } from 'components'

import { WS_CONNECTION_END, WS_CONNECTION_START } from 'services/actions/feed'

import { ALL_ORDERS_URL, USER_ORDERS_URL } from 'utils/constants'
import { getCookie } from 'utils/helpers'
import { IOrder } from 'services/types'

import orderListStyles from './order-list.module.scss'

interface IOrderListProps {
  full: boolean
}

const OrderList: FC<IOrderListProps> = ({ full }) => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const isProfile = useMemo<boolean>(
    () => pathname.startsWith('/profile'),
    [pathname],
  )

  useEffect(() => {
    const url = isProfile
      ? `${USER_ORDERS_URL}${getCookie('token')}`
      : ALL_ORDERS_URL
    dispatch({ type: WS_CONNECTION_START, url })

    return () => {
      dispatch({ type: WS_CONNECTION_END })
    }
  }, [dispatch, pathname, isProfile])

  const { orders, wsConnected }: { orders: IOrder[]; wsConnected: boolean } =
    //@ts-ignore
    useSelector(store => store.feed)

  return !wsConnected ? (
    <Loading />
  ) : (
    <ul className={orderListStyles.orders}>
      {(isProfile ? [...orders].reverse() : orders).map((order: IOrder) => (
        <OrderTile
          order={order}
          full={full}
          key={order._id}
        />
      ))}
    </ul>
  )
}

export default OrderList
