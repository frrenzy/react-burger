import { OrderTile } from 'components'

import orderListStyles from './order-list.module.scss'

const OrderList = () => {
  return (
    <div className={orderListStyles.orders}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, i) => (
        <OrderTile
          price={item}
          key={i}
        />
      ))}
    </div>
  )
}

export default OrderList
