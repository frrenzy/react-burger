import { useSelector } from 'react-redux'

import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Loading, Price } from 'components'

import { INGREDIENT_TYPES } from 'utils/constants'

import orderInfoStyles from './order-info.module.scss'

const OrderInfo = () => {
  const ingredients = useSelector(store => store.ingredients.items).slice(0, 6)
  const r = [...ingredients, ...ingredients]
  const real = r
    .sort((a, b) => (a._id > b._id ? 1 : a._id < b._id ? -1 : 0))
    .filter(item => item.type !== INGREDIENT_TYPES.BUN)
    .reduce((acc, item) => {
      const index = acc.findIndex(s => s._id === item._id)
      if (index !== -1) {
        acc[index].count += 1
      } else {
        acc.push({
          _id: item._id,
          count: 1,
          name: item.name,
          price: item.price,
          image_mobile: item.image_mobile,
        })
      }
      return acc
    }, [])
  const bun = ingredients.find(item => item.type === INGREDIENT_TYPES.BUN)

  const total =
    real.reduce((acc, item) => acc + item.price * item.count, 0) + 2 * bun?.price

  return !ingredients.length || !bun ? (
    <Loading />
  ) : (
    <div className={`${orderInfoStyles.container} mt-10 mb-10`}>
      <h2
        className={`text text_color_primary text_type_digits-default mb-10 ${orderInfoStyles.number}`}
      >
        #034535
      </h2>
      <h4
        className={`${orderInfoStyles.name} text text_color_primary text_type_main-medium mb-3`}
      >
        Death Star Starship Main burger
      </h4>
      <p className='text text_color_success text_type_main-default mb-15'>
        status
      </p>
      <p className='text text_color_primary text_type_main-medium mb-6'>
        Sostav:
      </p>
      <div className={`${orderInfoStyles.images} mb-10`}>
        <div className={`${orderInfoStyles['image-container']} mb-6 pr-6`}>
          <img
            src={bun.image_mobile}
            alt=''
            className={orderInfoStyles.image}
          />
          <p
            className={`${orderInfoStyles.name} text text_color_primary text_type_main-default`}
          >
            {bun.name}
          </p>
          <Price value={`2 x ${bun.price}`} />
        </div>
        {real.map((item, i) => (
          <div
            className={`${orderInfoStyles['image-container']} mb-6 pr-6`}
            key={i}
          >
            <img
              src={item.image_mobile}
              alt=''
              className={orderInfoStyles.image}
            />
            <p
              className={`${orderInfoStyles.name} text text_color_primary text_type_main-default`}
            >
              {item.name}
            </p>
            <Price value={`${item.count} x ${item.price}`} />
          </div>
        ))}
      </div>
      <div className={orderInfoStyles.total}>
        <p
          className={`${orderInfoStyles.date} text text_color_inactive text_type_main-default`}
        >
          <FormattedDate
            date={new Date()}
            className='pr-2'
          />
          i-GMT+3
        </p>
        <Price
          value={total}
          className={orderInfoStyles.price}
        />
      </div>
    </div>
  )
}

export default OrderInfo
