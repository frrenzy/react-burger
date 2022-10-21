import { useCallback, useContext, useMemo, useState } from 'react'

import {
  ConstructorElement,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { Price, Modal, OrderDetails } from 'components'

import { INGREDIENT_TYPES } from 'utils/constants'
import { IngredientsContext, TotalContext } from 'services/appContext'

import burgerConstructorStyles from './burger-constructor.module.scss'

const BurgerConstructor = () => {
  const [isOpen, setOpen] = useState(false)

  const { ingredientsState, ingredientsDispatcher } =
    useContext(IngredientsContext)
  const { totalState, totalDispatcher } = useContext(TotalContext)

  const ids = useMemo(
    () =>
      ingredientsState.ingredients
        .filter(({ count }) => count > 0)
        .map(({ _id }) => _id),
    [ingredientsState],
  )

  const bun = useMemo(
    () =>
      ingredientsState.ingredients.find(
        item => item._id === ingredientsState.bun,
      ),
    [ingredientsState],
  )

  const deleteFromCart = (_id, price) => () => {
    ingredientsDispatcher({
      type: 'deleteFromCart',
      payload: { _id: _id },
    })
    totalDispatcher({
      type: 'delete',
      payload: { price: price },
    })
  }

  const openModal = useCallback(() => {
    if (ids.length > 0) {
      setOpen(true)
    }
  }, [setOpen, ids.length])

  const closeModal = useCallback(() => setOpen(false), [setOpen])

  return (
    <>
      <div className={`${burgerConstructorStyles.list} mt-25`}>
        {ingredientsState.bun.length > 0 && (
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
          {ingredientsState.ingredients.map(
            ({ name, price, image, _id, count, type }) => {
              if (type === INGREDIENT_TYPES.BUN) {
                return null
              }
              return [...Array(count).keys()] //простой способ получить массив чисел от 0 до количества одинаковых элементов в корзинке
                .map(idx => (
                  <li
                    key={`${_id}_${idx}`}
                    className={`${burgerConstructorStyles.item} pl-4 pr-4`}
                  >
                    <DragIcon type='primary' />
                    <ConstructorElement
                      text={name}
                      price={price}
                      thumbnail={image}
                      handleClose={deleteFromCart(_id, price)}
                    />
                  </li>
                ))
            },
          )}
        </ul>
        {ingredientsState.bun.length > 0 && (
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
          value={totalState.total}
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
      {isOpen && (
        <Modal closeModal={closeModal}>
          <OrderDetails ids={ids} />
        </Modal>
      )}
    </>
  )
}

export default BurgerConstructor
