import { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Price, Modal, OrderDetails, ConstructorTile } from 'components'

import {
  ADD_TO_ORDER,
  OPEN_MODAL,
  REMOVE_FROM_ORDER,
  SET_BUN,
} from 'services/actions/order'
import {
  DECREASE_COUNTER,
  INCREASE_COUNTER,
} from 'services/actions/ingredients'

import { DRAG_TYPES, INGREDIENT_TYPES, TILE_TYPES } from 'utils/constants'

import burgerConstructorStyles from './burger-constructor.module.scss'

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

  const [, dropRef] = useDrop({
    accept: DRAG_TYPES.INGREDIENT,
    drop: ingredient => {
      if (ingredient.type === INGREDIENT_TYPES.BUN) {
        dispatch({
          type: SET_BUN,
          bun: ingredient,
        })
      } else {
        dispatch({
          type: ADD_TO_ORDER,
          ingredient: {
            ...ingredient,
            uuid: uuidv4(),
          },
        })
      }
      dispatch({
        type: INCREASE_COUNTER,
        ingredientType: ingredient.type,
        _id: ingredient._id,
      })
    },
  })

  const openModal = useCallback(
    () => dispatch({ type: OPEN_MODAL }),
    [dispatch],
  )

  const deleteFromCart = useCallback(
    (idx, _id) => () => {
      dispatch({ type: REMOVE_FROM_ORDER, idx })
      dispatch({ type: DECREASE_COUNTER, _id })
    },
    [dispatch],
  )

  return (
    <>
      <div
        className={`${burgerConstructorStyles.list} mt-25`}
        ref={dropRef}
      >
        {!cart.length && !bun && (
          <h2 className='text text_color_primary text_type_main-medium pl-30'>
            Перетащите ингредиенты в эту область, чтобы собрать бургер :)
          </h2>
        )}
        {bun && (
          <ConstructorTile
            name={`${bun.name} (верх)`}
            price={bun.price}
            image={bun.image}
            type={TILE_TYPES.TOP}
          />
        )}
        <ul className={`${burgerConstructorStyles.scrollable} mt-4 mb-4`}>
          {cart.map(({ name, price, image, _id, uuid }, idx) => (
            <ConstructorTile
              key={uuid}
              name={name}
              price={price}
              image={image}
              deleteHandler={deleteFromCart(idx, _id)}
              type={TILE_TYPES.CENTER}
              index={idx}
            />
          ))}
        </ul>
        {bun && (
          <ConstructorTile
            name={`${bun.name} (низ)`}
            price={bun.price}
            image={bun.image}
            type={TILE_TYPES.BOTTOM}
          />
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
