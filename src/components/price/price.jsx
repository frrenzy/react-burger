import PropTypes from 'prop-types'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import priceStyles from './price.module.scss'

const Price = ({ value, size = 'default' }) => {
  return (
    <>
      <p
        className={`text text_type_digits-${size} text_color_primary ${
          size === 'default' ? 'mb-2' : ''
        } ${priceStyles.paragraph}`}
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

Price.propTypes = {
  value: PropTypes.number.isRequired,
  size: PropTypes.string,
}

export default Price
