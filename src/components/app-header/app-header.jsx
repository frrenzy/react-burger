import { useState } from 'react'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { HeaderButton } from 'components'

import headerStyles from './app-header.module.scss'

const AppHeader = () => {
  const [current, setCurrent] = useState('constructor')

  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <ul className={`${headerStyles.list} pt-4 pb-4`}>
          <li className={headerStyles.item}>
            <HeaderButton
              text='Конструктор'
              value='constructor'
              isActive={current === 'constructor'}
              onClick={setCurrent}
              icon={BurgerIcon}
            />
            <HeaderButton
              text='Лента заказов'
              value='orders'
              isActive={current === 'orders'}
              onClick={setCurrent}
              icon={ListIcon}
            />
          </li>
          <li className={headerStyles.item}>
            <Logo />
          </li>
          <li className={headerStyles.item}>
            <HeaderButton
              text='Личный кабинет'
              value='profile'
              isActive={current === 'profile'}
              onClick={setCurrent}
              icon={ProfileIcon}
            />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader
