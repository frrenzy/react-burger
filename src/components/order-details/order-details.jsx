import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createOrder } from 'services/actions/order'

import doneIcon from 'images/done.png'

import orderDetailsStyles from './order-details.module.scss'

const OrderDetails = () => {
  const { cart, orderId, bun } = useSelector(store => store.order)
  const dispatch = useDispatch()

  useEffect(
    () =>
      dispatch(createOrder([bun._id, ...cart.map(item => item._id), bun._id])),
    [dispatch, cart, bun._id],
  )

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

export default OrderDetails
