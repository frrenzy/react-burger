import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import BasePage from 'pages/base/base'

import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { editUser, signOut } from 'services/actions/auth'

import profileStyles from './profile.module.scss'

const ProfilePage = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  const history = useHistory()

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  })

  useEffect(() => {
    setForm({ ...form, name: user?.name || '', email: user?.email || '' })
  }, [setForm, user?.name, user?.email]) //reset form values when stored user changes

  const handleInputChange = useCallback(
    e => setForm(form => ({ ...form, [e.target.name]: e.target.value })),
    [setForm],
  )

  const submitHandler = e => {
    e.preventDefault()
    dispatch(editUser(form))
  }

  const handleExit = useCallback(() => {
    dispatch(signOut())
    history.replace('/login')
  }, [dispatch, history])

  return (
    <BasePage>
      <div className={`${profileStyles.container} mt-30`}>
        <div>
          <p
            className={`${profileStyles.tab} text text_type_main-medium text_color_primary pt-4 pb-4`}
          >
            Профиль
          </p>
          <p
            className={`${profileStyles.tab} text text_type_main-medium text_color_inactive pt-4 pb-4`}
          >
            История заказов
          </p>
          <p
            className={`${profileStyles.tab} text text_type_main-medium text_color_inactive pt-4 pb-4`}
            onClick={handleExit}
          >
            Выход
          </p>
          <p
            className={`${profileStyles.tab} text text_type_main-default text_color_inactive mt-20`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <form
          className={profileStyles.form}
          onSubmit={submitHandler}
        >
          <Input
            name='name'
            onChange={handleInputChange}
            placeholder='Имя'
            value={form.name}
            extraClass='mb-6'
            icon='EditIcon'
          />
          <EmailInput
            name='email'
            onChange={handleInputChange}
            placeholder='Логин'
            value={form.email}
            errorText='Ой! Кажется, в Вашем адресе ошибка :('
            extraClass='mb-6'
            icon='EditIcon'
          />
          <PasswordInput
            name='password'
            onChange={handleInputChange}
            placeholder='Пароль'
            value={form.password}
            extraClass='mb-6'
            icon='EditIcon'
          />
          <Button
            size='medium'
            htmlType='submit'
            type='primary'
            extraClass='mb-20'
          >
            Сохранить
          </Button>
        </form>
      </div>
    </BasePage>
  )
}

export default ProfilePage
