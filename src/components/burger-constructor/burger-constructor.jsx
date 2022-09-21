import { useCallback } from 'react'
import PropTypes from 'prop-types'

import {
  ConstructorElement,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { Price } from 'components'

import burgerConstructorStyles from './burger-constructor.module.scss'

const BurgerConstructor = ({ cart, updateCart }) => {
  const cartLength = cart.length

  const getTypeByIndex = useCallback(
    idx =>
      idx === 0
        ? { type: 'top', isLocked: true }
        : idx === cartLength - 1
        ? { type: 'bottom', isLocked: true }
        : { type: undefined, isLocked: undefined },
    [cartLength],
  )

  return (
    <>
      <ul className={`${burgerConstructorStyles.list} mt-25 pl-4 pr-4`}>
        {cart.map(({ name, price, image, _id }, index) => (
          <li
            key={index}
            className={burgerConstructorStyles.item}
          >
            {!getTypeByIndex(index)?.isLocked && <DragIcon type='primary' />}
            <ConstructorElement
              text={name}
              price={price}
              thumbnail={image}
              {...getTypeByIndex(index)}
              handleClose={updateCart(_id)}
            />
          </li>
        ))}
      </ul>
      <div className={`${burgerConstructorStyles.controls} mt-10 mr-4`}>
        <Price
          value={cart.reduce((total, { price }) => total + price, 0)}
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
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
  updateCart: PropTypes.func.isRequired,
}

export default BurgerConstructor
