import { AppHeader } from 'components'

import baseStyles from './base.module.scss'

const BasePage = ({ tab = 'constructor', children }) => {
  return (
    <>
      <AppHeader tab={tab} />
      <main className={baseStyles.main}>{children}</main>
    </>
  )
}

export default BasePage
