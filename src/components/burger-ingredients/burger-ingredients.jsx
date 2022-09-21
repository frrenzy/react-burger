import { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { IngredientsSection } from 'components'

import burgerIngredientsStyles from './burger-ingredients.module.scss'

const BurgerIngredients = ({ ingredients, cart, updateCart }) => {
  const [current, setCurrent] = useState('bun')

  const refs = useRef([])
  const setRef = index => type => el => (refs.current[index] = { type, el })

  const handleTabClick = value => {
    const index = refs.current.findIndex(item => item.type === value)
    refs.current[index].el.scrollIntoView({ behavior: 'smooth' })
    setCurrent(value)
  }

  const buns = {
    name: 'Булки',
    type: 'bun',
    ingredients: ingredients.filter(ingredient => ingredient.type === 'bun'),
    cart: cart.filter(ingredient => ingredient.type === 'bun'),
  }
  const sauces = {
    name: 'Соусы',
    type: 'sauce',
    ingredients: ingredients.filter(ingredient => ingredient.type === 'sauce'),
    cart: cart.filter(ingredient => ingredient.type === 'sauce'),
  }
  const mains = {
    name: 'Начинки',
    type: 'main',
    ingredients: ingredients.filter(ingredient => ingredient.type === 'main'),
    cart: cart.filter(ingredient => ingredient.type === 'main'),
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
              value='bun'
              active={current === 'bun'}
              onClick={handleTabClick}
            >
              Булки
            </Tab>
          </li>
          <li>
            <Tab
              value='sauce'
              active={current === 'sauce'}
              onClick={handleTabClick}
            >
              Соусы
            </Tab>
          </li>
          <li>
            <Tab
              value='main'
              active={current === 'main'}
              onClick={handleTabClick}
            >
              Начинки
            </Tab>
          </li>
        </ul>
      </nav>
      <div className={`${burgerIngredientsStyles.ingredients}`}>
        {[buns, sauces, mains].map(
          ({ name, type, ingredients, cart }, index) => (
            <IngredientsSection
              key={name}
              name={name}
              sectionRef={setRef(index)}
              ingredients={ingredients}
              type={type}
              cart={cart}
              updateCart={updateCart}
            />
          ),
        )}
      </div>
    </>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
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

export default BurgerIngredients
