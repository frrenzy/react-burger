import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect, useLocation } from 'react-router-dom'

import {
  Button,
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { BasePage } from 'pages'

import { resetPasswordRequest } from 'api'
import { getCookie } from 'utils/helpers'

import resetPasswordStyles from './reset-password.module.scss'

const ResetPasswordPage = () => {
  const { state } = useLocation()
  const authToken = getCookie('token')
  const user = useSelector(store => store.auth.user)

  const [form, setForm] = useState({ code: '', password: '' })
  const [isResetSuccess, setResetSuccess] = useState(false)

  const handleInputChange = useCallback(
    e => setForm(form => ({ ...form, [e.target.name]: e.target.value })),
    [setForm],
  )

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      resetPasswordRequest().then(res => setResetSuccess(true))
    },
    [setResetSuccess],
  )

  return isResetSuccess ||
    state?.from !== 'forgot-password' ||
    user ||
    authToken ? (
    <Redirect to='/' />
  ) : (
    <BasePage>
      <form
        className={resetPasswordStyles.form}
        onSubmit={handleSubmit}
      >
        <h2 className='text text_type_main-medium text_color_primary mb-6'>
          Восстановление пароля
        </h2>
        <PasswordInput
          name='password'
          onChange={handleInputChange}
          placeholder='Введите новый пароль'
          value={form.password}
          extraClass='mb-6'
        />
        <Input
          name='code'
          onChange={handleInputChange}
          placeholder='Введите код из письма'
          value={form.code}
          errorText='Проверьте введённый код'
          extraClass='mb-6'
        />
        <Button
          size='medium'
          htmlType='submit'
          type='primary'
          extraClass='mb-20'
        >
          Сохранить
        </Button>
        <p
          className={`${resetPasswordStyles.paragraph} text text_type_main-default text_color_inactive mb-4`}
        >
          Вспомнили пароль?
          {
            <Link to='/login'>
              <Button
                size='medium'
                htmlType='button'
                type='secondary'
                extraClass={`${resetPasswordStyles.button} mb-2`}
              >
                Войти
              </Button>
            </Link>
          }
        </p>
      </form>
    </BasePage>
  )
}

export default ResetPasswordPage
