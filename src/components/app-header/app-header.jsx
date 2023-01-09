import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { HeaderLink } from 'components'

import headerStyles from './app-header.module.scss'
import { Link } from 'react-router-dom'

const AppHeader = () => {
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
              to='/feed'
            />
          </li>
          <li className={headerStyles.item}>
            <Link to='/'>
              <Logo />
            </Link>
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
