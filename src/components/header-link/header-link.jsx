import PropTypes from 'prop-types'
import { NavLink, useLocation } from 'react-router-dom'

import headerButtonStyles from './header-link.module.scss'

const HeaderLink = ({ text, to, icon: Icon }) => {
  const { pathname } = useLocation()

  const isActive = pathname === to

  return (
    <NavLink
      to={to}
      exact
      className={`${headerButtonStyles.button} text_color_inactive pt-4 pr-5 pb-4 pl-5`}
      activeClassName='text_color_primary'
    >
      <Icon
        type={isActive ? 'primary' : 'secondary'}
      />
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

HeaderLink.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
}

export default HeaderLink
