import { useState } from 'react'

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { HeaderLink } from 'components'

import headerStyles from './app-header.module.scss'

const AppHeader = () => {
  const [current, setCurrent] = useState('constructor')

  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <ul className={`${headerStyles.list} pt-4 pb-4`}>
          <li className={headerStyles.item}>
            <HeaderLink
              text='Конструктор'
              icon={BurgerIcon}
              to='/'
            />
            <HeaderLink
              text='Лента заказов'
              icon={ListIcon}
              to='/orders'
            />
          </li>
          <li className={headerStyles.item}>
            <Logo />
          </li>
          <li className={headerStyles.item}>
            <HeaderLink
              text='Личный кабинет'
              icon={ProfileIcon}
              to='/profile'
            />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader
