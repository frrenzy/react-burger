import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from './app-header.module.scss'

const AppHeader = () => {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <ul className={`${headerStyles.list} pt-4 pb-4`}>
          <li className={headerStyles.item}>
            <button
              type='button'
              className={`${headerStyles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}
            >
              <BurgerIcon type='primary' />
              <p className='text text_type_main-default text_color_primary ml-2'>
                Конструктор
              </p>
            </button>
            <button
              type='button'
              className={`${headerStyles.button} pt-4 pr-5 pb-4 pl-5`}
            >
              <ListIcon type='secondary' />
              <p className='text text_type_main-default text_color_inactive ml-2'>
                Лента заказов
              </p>
            </button>
          </li>
          <li className={headerStyles.item}>
            <Logo />
          </li>
          <li className={headerStyles.item}>
            <button
              type='button'
              className={`${headerStyles.button} pt-4 pr-5 pb-4 pl-5`}
            >
              <ProfileIcon type='secondary' />
              <p className='text text_type_main-default text_color_inactive ml-2'>
                Личный кабинет
              </p>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader
