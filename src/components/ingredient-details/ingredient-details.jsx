import { useSelector } from 'react-redux'

import ingredientDetailsStyles from './ingredient-details.module.scss'

const IngredientDetails = () => {
  const { image_large, name, fat, calories, proteins, carbohydrates } =
    useSelector(store => store.detail.ingredient)

  return (
    <div className={`${ingredientDetailsStyles.container} mt-15 mb-15`}>
      <h2 className='text text_type_main-large text_color_primary'>
        Детали ингредиента
      </h2>
      <img
        src={image_large}
        alt={name}
        className='mb-4'
      />
      <h3 className='text text_type_main-medium text_color_primary mb-8'>
        {name}
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
            {calories}
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
            {proteins}
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
            {fat}
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
            {carbohydrates}
          </span>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails
