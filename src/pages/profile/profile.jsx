import BasePage from 'pages/base/base'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import profileStyles from './profile.module.scss'

const ProfilePage = () => {
  const { name, email } = useSelector(store => store.auth.user)

  const form = useState({ })

  return (
    <BasePage />

  )
}

export default ProfilePage
