import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { WS_CONNECTION_END, WS_CONNECTION_START } from 'services/actions/feed'

import { Loading, OrderList, Section } from 'components'

import feedStyles from './feed.module.scss'

const FeedPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      url: 'wss://norma.nomoreparties.space/orders/all',
    })

    return () => dispatch({ type: WS_CONNECTION_END })
  }, [dispatch])

  const { wsConnected, total, totalToday } = useSelector(store => store.feed)

  const readyOrders = useSelector(store =>
    store.feed.orders
      .filter(item => item.status === 'done')
      .map(item => item.number),
  )
  const wipOrders = useSelector(store =>
    store.feed.orders
      .filter(item => item.status === 'pending')
      .map(item => item.number),
  )

  const ready = useMemo(() => readyOrders?.slice(0, 10), [readyOrders])
  const wip = useMemo(() => wipOrders?.slice(0, 10), [wipOrders])

  return !wsConnected ? (
    <Loading />
  ) : (
    <>
      <Section>
        <h2 className='text text_color_primary text_type_main-large mt-10 mb-5'>
          Лента заказов
        </h2>
        <OrderList full={false} />
      </Section>
      <Section>
        <div className={`${feedStyles.container} mt-25`}>
          <div className={`${feedStyles.statuses} mb-15`}>
            <div className={feedStyles.status}>
              <h3 className='text text_color_primary text_type_main-medium mb-6'>
                Готовы:
              </h3>
              <ul className={feedStyles.list}>
                {ready.map(item => (
                  <li
                    className='text text_color_success text_type_digits-default mb-2'
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={feedStyles.status}>
              <h3 className='text text_color_primary text_type_main-medium mb-6'>
                В работе:
              </h3>
              <ul className={feedStyles.list}>
                {wip.map(item => (
                  <li
                    className='text text_color_primary text_type_digits-default mb-2'
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h3 className='text text_color_primary text_type_main-medium'>
            Выполнено за всё время:
          </h3>
          <p
            className={`${feedStyles.shadow} text text_color_primary text_type_digits-large mb-15`}
          >
            {total}
          </p>
          <h3 className='text text_color_primary text_type_main-medium'>
            Выполнено за сегодня:
          </h3>
          <p
            className={`${feedStyles.shadow} text text_color_primary text_type_digits-large`}
          >
            {totalToday}
          </p>
        </div>
      </Section>
    </>
  )
}

export default FeedPage
