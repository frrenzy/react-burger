import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import doneIcon from 'images/done.png'

import orderDetailsStyles from './order-details.module.css'
import { createOrder } from 'api'

const OrderDetails = ({ ids }) => {
  const [orderId, setOrderId] = useState(null)

  useEffect(() => {
    const getOrderId = async () => {
      createOrder(ids)
        .then(order => {
          if (order.success) {
            setOrderId(order.order.number)
          }
        })
        .catch(console.error)
    }

    getOrderId()
  }, [ids])

  return (
    <div className={`${orderDetailsStyles.container} mt-30 mb-30`}>
      <h2 className='text text_color_primary text_type_digits-large mb-8'>
        {orderId}
      </h2>
      <p className='text text_color_primary text_type_main-medium mb-15'>
        идентификатор заказа
      </p>
      <img
        src={doneIcon}
        alt='иконка готового заказа'
        className='mb-15'
      />
      <p className='text text_color_primary text_type_main-default mb-2'>
        Ваш заказ начали готовить
      </p>
      <p className='text text_color_inactive text_type_main-default'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

OrderDetails.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string),
}

export default OrderDetails
