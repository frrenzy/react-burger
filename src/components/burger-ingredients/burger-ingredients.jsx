import { useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { IngredientsSection, Modal, IngredientDetails } from 'components'
import { ingredient } from 'utils/prop-types'
import { INGREDIENT_TYPES } from 'utils/constants'

import burgerIngredientsStyles from './burger-ingredients.module.scss'

const BurgerIngredients = ({ ingredients, addItemToCart }) => {
  const [current, setCurrent] = useState(INGREDIENT_TYPES.BUN)
  const [isOpen, setOpen] = useState(false)
  const [detail, setDetail] = useState()

  const openDetails = useCallback(
    ingredient => () => {
      setDetail(ingredient)
      setOpen(true)
    },
    [setOpen, setDetail],
  )
  const closeModal = useCallback(() => {
    setOpen(false)
    setDetail()
  }, [setOpen, setDetail])


  const refs = useRef([])
  const setRef = index => type => el => (refs.current[index] = { type, el })

  const handleTabClick = value => {
    const index = refs.current.findIndex(item => item.type === value)
    refs.current[index].el.scrollIntoView({ behavior: 'smooth' })
    setCurrent(value)
  }

  const buns = {
    name: 'Булки',
    type: INGREDIENT_TYPES.BUN,
    ingredients: ingredients.filter(
      ingredient => ingredient.type === INGREDIENT_TYPES.BUN,
    ),
  }
  const sauces = {
    name: 'Соусы',
    type: INGREDIENT_TYPES.SAUCE,
    ingredients: ingredients.filter(
      ingredient => ingredient.type === INGREDIENT_TYPES.SAUCE,
    ),
  }
  const mains = {
    name: 'Начинки',
    type: INGREDIENT_TYPES.MAIN,
    ingredients: ingredients.filter(
      ingredient => ingredient.type === INGREDIENT_TYPES.MAIN,
    ),
  }

  return (
    <>
      <h1 className='text text_type_main-large text_color_primary mt-10 mb-5'>
        Соберите бургер
      </h1>
      <nav className='mt-5 mb-10'>
        <ul className={burgerIngredientsStyles.list}>
          <li>
            <Tab
              value={INGREDIENT_TYPES.BUN}
              active={current === INGREDIENT_TYPES.BUN}
              onClick={handleTabClick}
            >
              Булки
            </Tab>
          </li>
          <li>
            <Tab
              value={INGREDIENT_TYPES.SAUCE}
              active={current === INGREDIENT_TYPES.SAUCE}
              onClick={handleTabClick}
            >
              Соусы
            </Tab>
          </li>
          <li>
            <Tab
              value={INGREDIENT_TYPES.MAIN}
              active={current === INGREDIENT_TYPES.MAIN}
              onClick={handleTabClick}
            >
              Начинки
            </Tab>
          </li>
        </ul>
      </nav>
      <div className={`${burgerIngredientsStyles.ingredients}`}>
        {[buns, sauces, mains].map(({ name, type, ingredients }, index) => (
          <IngredientsSection
            key={name}
            name={name}
            sectionRef={setRef(index)}
            ingredients={ingredients}
            type={type}
            addItemToCart={addItemToCart}
            openDetails={openDetails}
          />
        ))}
      </div>
      {isOpen && detail && (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
        >
          <IngredientDetails ingredient={detail} />
        </Modal>
      )}
    </>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredient).isRequired,
  addItemToCart: PropTypes.func.isRequired,
}

export default BurgerIngredients
