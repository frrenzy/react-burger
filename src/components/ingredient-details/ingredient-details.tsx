import { FC } from 'react'
import { useSelector } from 'hooks'
import { useParams } from 'react-router-dom'

import { Loading } from 'components'

import { IIngredient } from 'services/types'

import ingredientDetailsStyles from './ingredient-details.module.scss'

const IngredientDetails: FC<{}> = () => {
  const { id } = useParams<{ id: string }>()
  const ingredients: ReadonlyArray<IIngredient> = useSelector(
    store => store.ingredients.items,
  )
  const ingredient: IIngredient | undefined = ingredients.find(
    (item: IIngredient) => item._id === id,
  )

  return !ingredient ? (
    <Loading />
  ) : (
    <div className={`${ingredientDetailsStyles.container} mt-15 mb-15`}>
      <h2 className='text text_type_main-large text_color_primary'>
        Детали ингредиента
      </h2>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className='mb-4'
      />
      <h3 className='text text_type_main-medium text_color_primary mb-8'>
        {ingredient.name}
      </h3>
      <div className={ingredientDetailsStyles.specs}>
        <div className={ingredientDetailsStyles.spec}>
          <span
            className={`${ingredientDetailsStyles.item} text text_type_main-default text_color_inactive`}
          >
            Калории,
          </span>
          <span
            className={`${ingredientDetailsStyles.item} text text_type_main-default text_color_inactive`}
          >
            ккал
          </span>
          <span
            className={`${ingredientDetailsStyles.item} text text_type_digits-default text_color_inactive`}
          >
            {ingredient.calories}
          </span>
        </div>
        <div className={ingredientDetailsStyles.spec}>
          <span
            className={`${ingredientDetailsStyles.item} text text_type_main-default text_color_inactive`}
          >
            Белки,
          </span>
          <span
            className={`${ingredientDetailsStyles.item} text text_type_main-default text_color_inactive`}
          >
            г
          </span>
          <span
            className={`${ingredientDetailsStyles.item} text text_type_digits-default text_color_inactive`}
          >
            {ingredient.proteins}
          </span>
        </div>
        <div className={ingredientDetailsStyles.spec}>
          <span
            className={`${ingredientDetailsStyles.item} text text_type_main-default text_color_inactive`}
          >
            Жиры,
          </span>
          <span
            className={`${ingredientDetailsStyles.item} text text_type_main-default text_color_inactive`}
          >
            г
          </span>
          <span
            className={`${ingredientDetailsStyles.item} text text_type_digits-default text_color_inactive`}
          >
            {ingredient.fat}
          </span>
        </div>
        <div className={ingredientDetailsStyles.spec}>
          <span
            className={`${ingredientDetailsStyles.item} text text_type_main-default text_color_inactive`}
          >
            Углеводы,
          </span>
          <span
            className={`${ingredientDetailsStyles.item} text text_type_main-default text_color_inactive`}
          >
            г
          </span>
          <span
            className={`${ingredientDetailsStyles.item} text text_type_digits-default text_color_inactive`}
          >
            {ingredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails
