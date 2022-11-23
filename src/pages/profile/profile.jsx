import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import BasePage from 'pages/base/base'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import profileStyles from './profile.module.scss'

const ProfilePage = () => {
  const { name, email } = useSelector(store => store.auth.user)

  const form = useState({ name, email, password: '' })

  return (
    <BasePage>
      <div className={profileStyles.container}>
        <div></div>
        <EmailInput value={email} />
        <div></div>
      </div>
    </BasePage>
  )
}

export default ProfilePage
