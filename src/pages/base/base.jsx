import { AppHeader } from 'components'
import PropTypes from 'prop-types'

import baseStyles from './base.module.scss'

const BasePage = ({ tab = 'constructor', children }) => {
  return (
    <>
      <AppHeader tab={tab} />
      <main className={baseStyles.main}>{children}</main>
    </>
  )
}

BasePage.propTypes = {
  tab: PropTypes.string,
}

export default BasePage
