import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import HeaderButton from '../header-button'

import headerStyles from './app-header.module.scss'

const AppHeader = () => {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <ul className={`${headerStyles.list} pt-4 pb-4`}>
          <li className={headerStyles.item}>
            <HeaderButton text='Конструктор'>
              <BurgerIcon type='primary' />
            </HeaderButton>
            <HeaderButton text='Лента заказов'>
              <ListIcon type='secondary' />
            </HeaderButton>
          </li>
          <li className={headerStyles.item}>
            <Logo />
          </li>
          <li className={headerStyles.item}>
            <HeaderButton text='Личный кабинет'>
              <ProfileIcon type='secondary' />
            </HeaderButton>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader
