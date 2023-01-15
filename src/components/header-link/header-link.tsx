import { FC } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'

import headerButtonStyles from './header-link.module.scss'

interface IHeaderLinkProps {
  text: string
  to: string
  icon: (props: TIconProps) => JSX.Element
}

const HeaderLink: FC<IHeaderLinkProps> = ({ text, to, icon: Icon }) => {
  const { pathname } = useLocation()

  const isActive = pathname === to

  return (
    <NavLink
      to={to}
      exact
      className={`${headerButtonStyles.button} text_color_inactive pt-4 pr-5 pb-4 pl-5`}
      activeClassName='text_color_primary'
    >
      <Icon type={isActive ? 'primary' : 'secondary'} />
      <p
        className={`text text_type_main-default text_color_${
          isActive ? 'primary' : 'inactive'
        } ml-2`}
      >
        {text}
      </p>
    </NavLink>
  )
}

export default HeaderLink
