import { FC, useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'

import { IIngredient, IIngredientWithUUID } from 'services/types'

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import {
  Price,
  Modal,
  OrderDetails,
  ConstructorTile,
  TCloseModalCallback,
} from 'components'

import {
  ADD_TO_ORDER,
  CLOSE_ORDER_MODAL,
  REMOVE_FROM_ORDER,
  SET_BUN,
  createOrder,
} from 'services/actions/order'
import {
  decreaseCounterAction,
  increaseCounterAction,
} from 'services/actions/ingredients'

import { DragType, TileType } from 'services/types'
import { IngredientType } from 'services/types/data'

import burgerConstructorStyles from './burger-constructor.module.scss'

const BurgerConstructor: FC<{}> = () => {
  const dispatch = useDispatch()
  //@ts-ignore
  const user = useSelector(store => store.auth.user)
  const {
    isModalOpen,
    cart,
    bun,
    orderRequest: isLoading,
  }: //@ts-ignore
  {
    bun: IIngredient
    isModalOpen: boolean
    orderRequest: boolean
    cart: IIngredientWithUUID[]
    //@ts-ignore
  } = useSelector(store => store.order)

  const history = useHistory()
  const location = useLocation()

  const totalPrice = useMemo<number>(() => {
    let sum = 0
    sum += bun ? 2 * bun.price : 0
    sum += cart
      ? cart.reduce((acc: number, { price }: IIngredient) => acc + price, 0)
      : 0
    return sum
  }, [cart, bun])

  const [, dropRef] = useDrop({
    accept: DragType.Ingredient,
    drop: (ingredient: IIngredient) => {
      if (ingredient.type === IngredientType.Bun) {
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
      dispatch(increaseCounterAction(ingredient.type, ingredient._id))
    },
  })

  const handleClick = useCallback<() => void>(() => {
    if (!user) {
      history.push({
        pathname: '/login',
        state: { from: location },
      })
    } else {
      dispatch(
        //@ts-ignore
        createOrder([
          bun._id,
          ...cart.map((item: IIngredient) => item._id),
          bun._id,
        ]),
      )
    }
  }, [dispatch, cart, bun, history, user, location])

  const closeModal = useCallback<TCloseModalCallback>(
    () => dispatch({ type: CLOSE_ORDER_MODAL }),
    [dispatch],
  )

  const deleteFromCart = useCallback<
    (idx: number, _id: IIngredient['_id']) => () => void
  >(
    (idx, _id) => () => {
      dispatch({ type: REMOVE_FROM_ORDER, idx })
      dispatch(decreaseCounterAction(_id))
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
            type={TileType.Top}
          />
        )}
        <ul className={`${burgerConstructorStyles.scrollable} mt-4 mb-4`}>
          {cart.map(
            (
              { name, price, image, _id, uuid }: IIngredientWithUUID,
              idx: number,
            ) => (
              <ConstructorTile
                key={uuid}
                name={name}
                price={price}
                image={image}
                deleteHandler={deleteFromCart(idx, _id)}
                type={TileType.Center}
                index={idx}
              />
            ),
          )}
        </ul>
        {bun && (
          <ConstructorTile
            name={`${bun.name} (низ)`}
            price={bun.price}
            image={bun.image}
            type={TileType.Bottom}
          />
        )}
      </div>
      <div className={`${burgerConstructorStyles.controls} mt-10 mr-4`}>
        <Price
          value={totalPrice}
          size='medium'
        />
        <Button
          onClick={handleClick}
          type='primary'
          htmlType='button'
          size='large'
          disabled={!bun}
        >
          {isLoading ? 'Пожалуйста, подождите...' : 'Оформить заказ'}
        </Button>
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  )
}

export default BurgerConstructor
