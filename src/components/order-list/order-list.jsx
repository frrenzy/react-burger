import PropTypes from 'prop-types'

import { OrderTile } from 'components'

import orderListStyles from './order-list.module.scss'
import { useSelector } from 'react-redux'

const OrderList = ({ full }) => {
  const orders = useSelector(store => store.feed.orders)

  return (
    <div className={orderListStyles.orders}>
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
