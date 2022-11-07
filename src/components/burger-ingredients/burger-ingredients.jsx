import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInView } from 'react-intersection-observer'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import {
  IngredientsSection,
  Modal,
  IngredientDetails,
  Loading,
} from 'components'

import { SET_TAB } from 'services/actions/ingredients'

import { INGREDIENT_TYPES } from 'utils/constants'

import burgerIngredientsStyles from './burger-ingredients.module.scss'
import { RESET_DETAIL } from 'services/actions/detail'

const BurgerIngredients = () => {
  const isOpen = useSelector(store => store.detail.isModalOpen)
  const { currentTab, ingredientsRequest: isLoading } = useSelector(
    store => store.ingredients,
  )
  const dispatch = useDispatch()

  const [bunSectionRef, bunInView] = useInView({ threshold: 0.01 })
  const [sauceSectionRef, sauceInView] = useInView({ threshold: 0.01 })
  const [mainSectionRef, mainInView] = useInView({ threshold: 0.01 })

  const bunHeaderRef = useRef(null)
  const sauceHeaderRef = useRef(null)
  const mainHeaderRef = useRef(null)

  const sectionsProps = [
    {
      name: 'Булки',
      type: INGREDIENT_TYPES.BUN,
      sectionRef: bunSectionRef,
      headerRef: bunHeaderRef,
    },
    {
      name: 'Соусы',
      type: INGREDIENT_TYPES.SAUCE,
      sectionRef: sauceSectionRef,
      headerRef: sauceHeaderRef,
    },
    {
      name: 'Начинки',
      type: INGREDIENT_TYPES.MAIN,
      sectionRef: mainSectionRef,
      headerRef: mainHeaderRef,
    },
  ]

  const handleTabClick = value => {
    sectionsProps
      .find(item => item.type === value)
      .headerRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (bunInView) {
      dispatch({ type: SET_TAB, tab: INGREDIENT_TYPES.BUN })
    } else if (sauceInView) {
      dispatch({ type: SET_TAB, tab: INGREDIENT_TYPES.SAUCE })
    } else if (mainInView) {
      dispatch({ type: SET_TAB, tab: INGREDIENT_TYPES.MAIN })
    }
  }, [bunInView, sauceInView, mainInView, dispatch])

  const closeModal = useCallback(
    () => dispatch({ type: RESET_DETAIL }),
    [dispatch],
  )

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
              active={currentTab === INGREDIENT_TYPES.BUN}
              onClick={handleTabClick}
            >
              Булки
            </Tab>
          </li>
          <li>
            <Tab
              value={INGREDIENT_TYPES.SAUCE}
              active={currentTab === INGREDIENT_TYPES.SAUCE}
              onClick={handleTabClick}
            >
              Соусы
            </Tab>
          </li>
          <li>
            <Tab
              value={INGREDIENT_TYPES.MAIN}
              active={currentTab === INGREDIENT_TYPES.MAIN}
              onClick={handleTabClick}
            >
              Начинки
            </Tab>
          </li>
        </ul>
      </nav>
      <div className={`${burgerIngredientsStyles.ingredients}`}>
        {isLoading ? (
          <Loading />
        ) : (
          sectionsProps.map(({ name, type, sectionRef, headerRef }) => (
            <IngredientsSection
              key={name}
              name={name}
              sectionRef={sectionRef}
              headerRef={headerRef}
              type={type}
            />
          ))
        )}
      </div>
      {isOpen && (
        <Modal closeModal={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  )
}

export default BurgerIngredients
