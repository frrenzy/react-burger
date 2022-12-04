import PropTypes from 'prop-types'

import { OrderTile } from 'components'

import orderListStyles from './order-list.module.scss'

const OrderList = ({ full }) => {
  return (
    <div className={orderListStyles.orders}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, i) => (
        <OrderTile
          price={item}
          full={full}
          key={i}
        />
      ))}
    </div>
  )
}

OrderList.propTypes = {
  full: PropTypes.bool.isRequired,
}

export default OrderList
