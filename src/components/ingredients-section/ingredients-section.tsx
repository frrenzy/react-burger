import { FC, RefObject } from 'react'
import { InViewHookResponse } from 'react-intersection-observer'
import { useSelector } from 'hooks'

import { IngredientCard } from 'components'

import { IIngredient } from 'services/types'
import { IngredientType } from 'services/types/data'

import ingredientsSectionStyles from './ingredients-section.module.scss'

export interface IIngredientSectionProps {
  name: string
  type: IngredientType
  sectionRef: InViewHookResponse['ref']
  headerRef: RefObject<HTMLHeadingElement>
}

const IngredientsSection: FC<IIngredientSectionProps> = ({
  name,
  sectionRef,
  headerRef,
  type,
}) => {
  const ingredients: IIngredient[] = useSelector(store =>
    store.ingredients.items.filter(ingredient => ingredient.type === type),
  )

  return (
    <section ref={sectionRef}>
      <h2
        ref={headerRef}
        className={`${ingredientsSectionStyles.heading} text text_type_main-medium`}
      >
        {name}
      </h2>
      <ul className={`${ingredientsSectionStyles.list} pt-6 pr-4 pl-4 pb-10`}>
        {ingredients.length > 0 ? (
          ingredients.map((ingredient: IIngredient) => (
            <li key={ingredient._id}>
              <IngredientCard ingredient={ingredient} />
            </li>
          ))
        ) : (
          <p>Вариантов нет :(</p>
        )}
      </ul>
    </section>
  )
}

export default IngredientsSection
