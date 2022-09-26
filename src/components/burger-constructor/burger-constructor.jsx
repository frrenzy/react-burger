import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import {
  ConstructorElement,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { Price, Modal, OrderDetails } from 'components'
import { ingredient } from 'utils/prop-types'
import { INGREDIENT_TYPES } from 'utils/constants'

import burgerConstructorStyles from './burger-constructor.module.scss'

const BurgerConstructor = ({ ingredients, deleteItemFromCart }) => {
  const [isOpen, setOpen] = useState(false)

  const totalPrice = ingredients.ingredients.reduce(
    (total, { price, count }) => total + price * count,
    0,
  )

  const openModal = useCallback(() => setOpen(true), [setOpen])
  const closeModal = useCallback(() => setOpen(false), [setOpen])

  const bun = ingredients.ingredients.find(item => item._id === ingredients.bun)

  return (
    <>
      <div className={`${burgerConstructorStyles.list} mt-25`}>
        {ingredients.bun.length > 0 && (
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
          {ingredients.ingredients.map(
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
                      handleClose={deleteItemFromCart(_id)}
                    />
                  </li>
                ))
            },
          )}
        </ul>
        {ingredients.bun.length > 0 && (
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
      {isOpen && (
        <Modal
          closeModal={closeModal}
        >
          <OrderDetails />
        </Modal>
      )}
    </>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.shape({
    ingredients: PropTypes.arrayOf(ingredient),
    bun: PropTypes.string.isRequired,
  }).isRequired,
  deleteItemFromCart: PropTypes.func.isRequired,
}

export default BurgerConstructor
