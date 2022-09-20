import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import priceStyles from './price.module.scss'

const Price = ({ value }) => {
  return (
    <>
      <p
        className={`text text_type_digits-default text_color_primary mb-2 ${priceStyles.paragraph}`}
      >
        <span>{value}</span>
        <CurrencyIcon
          classname='ml-10'
          type='primary'
        />
      </p>
    </>
  )
}

export default Price
