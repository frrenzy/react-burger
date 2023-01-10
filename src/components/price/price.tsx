import { FC } from 'react'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import priceStyles from './price.module.scss'

interface IPriceProps {
  value: number | string
  size?: 'small' | 'default' | 'medium' | 'large'
  className?: string
}

const Price: FC<IPriceProps> = ({
  value,
  size = 'default',
  className = '',
}) => {
  return (
    <p
      className={`text text_type_digits-${size} text_color_primary ${priceStyles.paragraph} ${className}`}
    >
      <span className={priceStyles.span}>{value}</span>
      <CurrencyIcon type='primary' />
    </p>
  )
}

export default Price
