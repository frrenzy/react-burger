import { useEffect, useRef, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInView } from 'react-intersection-observer'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsSection, Loading } from 'components'
import type { IIngredientSectionProps } from 'components'

import { SET_TAB } from 'services/actions/ingredients'

import { IngredientType } from 'utils/types'

import burgerIngredientsStyles from './burger-ingredients.module.scss'

const BurgerIngredients: FC = () => {
  const { currentTab, ingredientsRequest: isLoading } = useSelector(
    //@ts-ignore
    store => store.ingredients,
  )
  const dispatch = useDispatch()

  const { ref: bunSectionRef, inView: bunInView } = useInView({
    threshold: 0.01,
  })
  const [sauceSectionRef, sauceInView] = useInView({ threshold: 0.01 })
  const [mainSectionRef, mainInView] = useInView({ threshold: 0.01 })

  const bunHeaderRef = useRef<HTMLHeadingElement>(null)
  const sauceHeaderRef = useRef<HTMLHeadingElement>(null)
  const mainHeaderRef = useRef<HTMLHeadingElement>(null)

  const sectionsProps: IIngredientSectionProps[] = [
    {
      name: 'Булки',
      type: IngredientType.Bun,
      sectionRef: bunSectionRef,
      headerRef: bunHeaderRef,
    },
    {
      name: 'Соусы',
      type: IngredientType.Sauce,
      sectionRef: sauceSectionRef,
      headerRef: sauceHeaderRef,
    },
    {
      name: 'Начинки',
      type: IngredientType.Main,
      sectionRef: mainSectionRef,
      headerRef: mainHeaderRef,
    },
  ]

  // union to surpass library prop typing
  const handleTabClick = (value: IngredientType | string) => {
    if (sectionsProps) {
      sectionsProps
        ?.find(item => item.type === value)
        ?.headerRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (bunInView) {
      dispatch({ type: SET_TAB, tab: IngredientType.Bun })
    } else if (sauceInView) {
      dispatch({ type: SET_TAB, tab: IngredientType.Sauce })
    } else if (mainInView) {
      dispatch({ type: SET_TAB, tab: IngredientType.Main })
    }
  }, [bunInView, sauceInView, mainInView, dispatch])

  return (
    <>
      <h1 className='text text_type_main-large text_color_primary mt-10 mb-5'>
        Соберите бургер
      </h1>
      <nav className='mt-5 mb-10'>
        <ul className={burgerIngredientsStyles.list}>
          <li>
            <Tab
              value={IngredientType.Bun}
              active={currentTab === IngredientType.Bun}
              onClick={handleTabClick}
            >
              Булки
            </Tab>
          </li>
          <li>
            <Tab
              value={IngredientType.Sauce}
              active={currentTab === IngredientType.Sauce}
              onClick={handleTabClick}
            >
              Соусы
            </Tab>
          </li>
          <li>
            <Tab
              value={IngredientType.Main}
              active={currentTab === IngredientType.Main}
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
          sectionsProps.map(
            ({
              name,
              type,
              sectionRef,
              headerRef,
            }: IIngredientSectionProps) => (
              <IngredientsSection
                key={name}
                name={name}
                sectionRef={sectionRef}
                headerRef={headerRef}
                type={type}
              />
            ),
          )
        )}
      </div>
    </>
  )
}

export default BurgerIngredients
