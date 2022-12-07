import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { OrderTile } from 'components'

import { WS_CONNECTION_END, WS_CONNECTION_START } from 'services/actions/feed'

import { ALL_ORDERS_URL, USER_ORDERS_URL } from 'utils/constants'
import { getCookie } from 'utils/helpers'

import orderListStyles from './order-list.module.scss'

const OrderList = ({ full }) => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const isProfile = useMemo(() => pathname.startsWith('/profile'), [pathname])

  useEffect(() => {
    const url = isProfile
      ? `${USER_ORDERS_URL}${getCookie('token')}`
      : ALL_ORDERS_URL
    dispatch({ type: WS_CONNECTION_START, url })

    return () => dispatch({ type: WS_CONNECTION_END })
  }, [dispatch, pathname, isProfile])

  const orders = useSelector(store => store.feed.orders)

  return (
    <div
      className={`${orderListStyles.orders} ${
        isProfile && orderListStyles.self
      }`}
    >
      {orders.map(order => (
        <OrderTile
          order={order}
          full={full}
          key={order._id}
        />
      ))}
    </div>
  )
}

OrderList.propTypes = {
  full: PropTypes.bool.isRequired,
}

export default OrderList
