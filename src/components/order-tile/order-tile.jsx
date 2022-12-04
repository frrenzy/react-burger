import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Price } from 'components'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'

import orderTileStyles from './order-tile.module.scss'

const OrderTile = ({ price }) => {
  const ingredients = useSelector(store => store.ingredients.items).slice(0, 7)
  const count = ingredients.length

  return (
    <div className={`${orderTileStyles.container} p-6`}>
      <h2 className='text text_color_primary text_type_digits-default mb-6'>
        #034535
      </h2>
      <p
        className={`${orderTileStyles.date} text text_color_inactive text_type_main-default`}
      >
        <FormattedDate
          date={new Date()}
          className='pr-2'
        />
        i-GMT+3
      </p>
      <h3
        className={`${orderTileStyles.name} text text_color_primary text_type_main-medium mb-6`}
      >
        Death Star Starship Main burger
      </h3>
      <div className={orderTileStyles.images}>
        {count > 6 && (
          <p
            className={`text text_color_primary text_type_main-default ${orderTileStyles.counter}`}
          >
            {`+${count - 6}`}
          </p>
        )}
        {ingredients
          .slice(0, 6)
          .reverse()
          .map((item, i) => (
            <div
              className={`${orderTileStyles['image-container']} mb-1 mt-1`}
              key={i}
            >
              <img
                src={item.image_mobile}
                alt=''
                className={orderTileStyles.image}
              />
            </div>
          ))}
      </div>
      <Price
        value={price}
        className={orderTileStyles.price}
      />
    </div>
  )
}

export default OrderTile
