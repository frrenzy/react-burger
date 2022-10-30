import { useState, useRef } from 'react'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { IngredientsSection, Modal, IngredientDetails } from 'components'

import { INGREDIENT_TYPES } from 'utils/constants'

import burgerIngredientsStyles from './burger-ingredients.module.scss'
import { useSelector } from 'react-redux'

const BurgerIngredients = () => {
  const isOpen = useSelector(store => store.detail.isModalOpen)

  const [current, setCurrent] = useState(INGREDIENT_TYPES.BUN)

  const refs = useRef([])
  const setRef = index => type => el => (refs.current[index] = { type, el })

  const handleTabClick = value => {
    const index = refs.current.findIndex(item => item.type === value)
    refs.current[index].el.scrollIntoView({ behavior: 'smooth' })
    setCurrent(value)
  }

  const sections = [
    { name: 'Булки', type: INGREDIENT_TYPES.BUN },
    { name: 'Соусы', type: INGREDIENT_TYPES.SAUCE },
    { name: 'Начинки', type: INGREDIENT_TYPES.MAIN },
  ]

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
        {sections.map(({ name, type }, index) => (
          <IngredientsSection
            key={name}
            name={name}
            sectionRef={setRef(index)}
            type={type}
          />
        ))}
      </div>
      {isOpen && (
        <Modal>
          <IngredientDetails />
        </Modal>
      )}
    </>
  )
}

export default BurgerIngredients
