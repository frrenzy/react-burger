import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { BasePage } from 'pages'

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

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  })

  const resetForm = useCallback(
    () =>
      setForm(form => ({
        ...form,
        name: user?.name || '',
        email: user?.email || '',
      })),
    [user?.name, user?.email],
  )

  const isFormChanged = form.name !== user?.name || form.email !== user?.email

  useEffect(() => {
    resetForm()
  }, [resetForm]) //reset form values when stored user changes

  const handleInputChange = useCallback(
    e => setForm(form => ({ ...form, [e.target.name]: e.target.value })),
    [setForm],
  )

  const submitHandler = useCallback(
    e => {
      e.preventDefault()
      dispatch(editUser(form))
    },
    [dispatch, form],
  )

  const resetHandler = useCallback(
    e => {
      e.preventDefault()
      resetForm()
    },
    [resetForm],
  )

  const handleExit = useCallback(() => {
    dispatch(signOut())
  }, [dispatch])

  const generateNavLinkClassname = useCallback(
    isActive => `${profileStyles.tab} text text_type_main-medium ${!isActive && 'text_color_inactive'} pt-4 pb-4`,
    []
  )

  return (
    <BasePage>
      <div className={`${profileStyles.container} mt-30`}>
        <div>
          <NavLink
            className={generateNavLinkClassname}
            activeClassName={'text_color_primary'}
            to='/profile'
            exact
          >
            Профиль
          </NavLink>
          <NavLink
            className={generateNavLinkClassname}
            activeClassName={'text_color_primary'}
            to='/profile/orders'
            exact
          >
            История заказов
          </NavLink>
          <Link
            className={`${profileStyles.tab} text text_type_main-medium text_color_inactive pt-4 pb-4`}
            to='/login'
            onClick={handleExit}
          >
            Выход
          </Link>
          <p
            className={`${profileStyles.tab} text text_type_main-default text_color_inactive mt-20`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <form
          className={profileStyles.form}
          onSubmit={submitHandler}
          onReset={resetHandler}
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
          {(isFormChanged || form.password) && (
            <div className={profileStyles.controls}>
              <Button
                size='medium'
                htmlType='submit'
                type='primary'
                extraClass='mb-20'
              >
                Сохранить
              </Button>
              <Button
                size='medium'
                htmlType='reset'
                type='primary'
                extraClass='mb-20'
              >
                Отменить
              </Button>
            </div>
          )}
        </form>
      </div>
    </BasePage>
  )
}

export default ProfilePage
