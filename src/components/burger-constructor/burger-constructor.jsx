import { useCallback } from 'react'
import PropTypes from 'prop-types'

import {
  ConstructorElement,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { Price } from 'components'
import { ingredient } from 'utils/prop-types'

import burgerConstructorStyles from './burger-constructor.module.scss'

const BurgerConstructor = ({ ingredients, deleteItemFromCart }) => {
  const cartLength = ingredients.length

  const getTypeByIndex = useCallback(
    idx => {
      if (idx === 0) {
        return { type: 'top', isLocked: true }
      }
      if (idx === cartLength - 1) {
        return { type: 'bottom', isLocked: true }
      }
      return { type: undefined, isLocked: undefined }
    },
    [cartLength],
  )
  const totalPrice = ingredients.reduce((total, { price }) => total + price, 0)

  return (
    <>
      <ul className={`${burgerConstructorStyles.list} mt-25 pl-4 pr-4`}>
        {ingredients.map(({ name, price, image, _id, count }, index) => {
            return [...Array(count).keys()] //простой способ получить массив чисел от 0 до количества одинаковых элементов в корзинке
              .map(idx => (
                <li
                  key={`${_id}_${idx}`}
                  className={burgerConstructorStyles.item}
                >
                  {!getTypeByIndex(index)?.isLocked && (
                    <DragIcon type='primary' />
                  )}
                  <ConstructorElement
                    text={name}
                    price={price}
                    thumbnail={image}
                    {...getTypeByIndex(index)}
                    handleClose={deleteItemFromCart(_id)}
                  />
                </li>
              ))
          }
        )}
      </ul>
      <div className={`${burgerConstructorStyles.controls} mt-10 mr-4`}>
        <Price
          value={totalPrice}
          size='medium'
        />
        <Button
          type='primary'
          size='large'
        >
          Оформить заказ
        </Button>
      </div>
    </>
  )
}

BurgerConstructor.propTypes = {}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredient).isRequired,
  deleteItemFromCart: PropTypes.func.isRequired,
}

export default BurgerConstructor
