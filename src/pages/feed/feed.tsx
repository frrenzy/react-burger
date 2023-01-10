import { useMemo, FC } from 'react'
import { useSelector } from 'react-redux'

import { Loading, OrderList, Section } from 'components'

import feedStyles from './feed.module.scss'
import { IOrder } from 'utils/types'

const FeedPage: FC<{}> = () => {
  //@ts-ignore
  const { wsConnected, total, totalToday } = useSelector(store => store.feed)

  const readyOrders: number[] = useSelector(store =>
    //@ts-ignore
    store.feed.orders
      .filter((item: IOrder) => item.status === 'done')
      .map((item: IOrder) => item.number),
  )
  const wipOrders: number[] = useSelector(store =>
    //@ts-ignore
    store.feed.orders
      .filter((item: IOrder) => item.status === 'pending')
      .map((item: IOrder) => item.number),
  )

  const ready = useMemo<number[]>(
    () => readyOrders?.slice(0, 10),
    [readyOrders],
  )
  const wip = useMemo<number[]>(() => wipOrders?.slice(0, 10), [wipOrders])

  return (
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
                {ready.map((item: number) => (
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
                {wip.map((item: number) => (
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
