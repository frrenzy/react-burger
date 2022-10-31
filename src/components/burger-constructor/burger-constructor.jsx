import { useCallback, useMemo } from 'react'

import {
  ConstructorElement,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { Price, Modal, OrderDetails } from 'components'

import { INGREDIENT_TYPES } from 'utils/constants'

import burgerConstructorStyles from './burger-constructor.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { OPEN_MODAL, REMOVE_FROM_ORDER } from 'services/actions/order'

const BurgerConstructor = () => {
  const dispatch = useDispatch()

  const { isModalOpen, cart, bun } = useSelector(store => store.order)

  const totalPrice = useMemo(
    () =>
      bun && cart
        ? 2 * bun.price + cart.reduce((acc, { price }) => acc + price, 0)
        : 0,
    [cart, bun],
  )

  const openModal = useCallback(
    () => dispatch({ type: OPEN_MODAL }),
    [dispatch],
  )

  const deleteFromCart = idx => () => dispatch({ type: REMOVE_FROM_ORDER, idx })

  return (
    <>
      <div className={`${burgerConstructorStyles.list} mt-25`}>
        {bun && (
          <li
            key={`${bun._id}_top`}
            className={`${burgerConstructorStyles.item} pl-4 pr-4`}
          >
            <ConstructorElement
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              type='top'
              isLocked={true}
            />
          </li>
        )}
        <ul className={`${burgerConstructorStyles.scrollable} mt-4 mb-4`}>
          {cart.map(({ name, price, image, _id }, idx) => (
            <li
              key={`${_id}_${idx}`}
              className={`${burgerConstructorStyles.item} pl-4 pr-4`}
            >
              <DragIcon type='primary' />
              <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={deleteFromCart(idx)}
              />
            </li>
          ))}
        </ul>
        {bun && (
          <li
            key={`${bun._id}_bottom`}
            className={`${burgerConstructorStyles.item} pl-4 pr-4`}
          >
            <ConstructorElement
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              type='bottom'
              isLocked={true}
            />
          </li>
        )}
      </div>
      <div className={`${burgerConstructorStyles.controls} mt-10 mr-4`}>
        <Price
          value={totalPrice}
          size='medium'
        />
        <Button
          onClick={openModal}
          type='primary'
          size='large'
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </>
  )
}

export default BurgerConstructor
