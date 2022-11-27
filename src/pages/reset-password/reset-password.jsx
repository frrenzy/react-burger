import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'

import { useForm } from 'hooks'

import {
  Button,
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { resetPasswordRequest } from 'api'
import { getCookie } from 'utils/helpers'

import resetPasswordStyles from './reset-password.module.scss'

const ResetPasswordPage = () => {
  const { state } = useLocation()
  const authToken = getCookie('token')
  const user = useSelector(store => store.auth.user)

  const history = useHistory()

  const { form, handleChange } = useForm({ code: '', password: '' })
  const [isResetSuccess, setResetSuccess] = useState(false)

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      resetPasswordRequest(form).then(res => setResetSuccess(true))
    },
    [setResetSuccess, form],
  )

  const handleClick = useCallback(() => history.push('/login'), [history])

  return isResetSuccess ||
    state?.from !== 'forgot-password' ||
    user ||
    authToken ? (
    <Redirect to='/' />
  ) : (
    <form
      className={resetPasswordStyles.form}
      onSubmit={handleSubmit}
    >
      <h2 className='text text_type_main-medium text_color_primary mb-6'>
        Восстановление пароля
      </h2>
      <PasswordInput
        name='password'
        onChange={handleChange}
        placeholder='Введите новый пароль'
        value={form.password}
        extraClass='mb-6'
      />
      <Input
        name='code'
        onChange={handleChange}
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
          <Button
            size='medium'
            htmlType='button'
            type='secondary'
            extraClass={`${resetPasswordStyles.button} mb-2`}
            onClick={handleClick}
          >
            Войти
          </Button>
        }
      </p>
    </form>
  )
}

export default ResetPasswordPage
