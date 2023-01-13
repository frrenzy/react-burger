import { useEffect, useMemo, FC } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'hooks'

import { Loading, OrderTile } from 'components'

import {
  WSConnectionEndAction,
  WSConnectionStartAction,
} from 'services/actions/feed'
import { IFeedState } from 'services/reducers/feed'

import { ALL_ORDERS_URL, USER_ORDERS_URL } from 'utils/constants'
import { getCookie } from 'utils/helpers'

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
    dispatch(WSConnectionStartAction(url))

    return () => {
      dispatch(WSConnectionEndAction())
    }
  }, [dispatch, pathname, isProfile])

  const { orders, wsConnected }: IFeedState = useSelector(store => store.feed)

  return !wsConnected ? (
    <Loading />
  ) : (
    <ul className={orderListStyles.orders}>
      {(isProfile ? [...orders].reverse() : orders).map(order => (
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
