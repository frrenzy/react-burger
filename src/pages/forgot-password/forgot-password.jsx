import { useCallback, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import BasePage from 'pages/base'

import { getUserRequest } from 'api'

import forgotPasswordStyles from './forgot-password.module.scss'

const ForgotPasswordPage = () => {
  const [form, setForm] = useState({ email: '' })
  const [isResetSuccess, setResetSuccess] = useState(false)

  const handleInputChange = useCallback(
    e => setForm(form => ({ ...form, [e.target.name]: e.target.value })),
    [setForm],
  )

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      getUserRequest().then(res => setResetSuccess(true))
    },
    [setResetSuccess],
  )

  return isResetSuccess ? (
    <Redirect to='/reset-password' />
  ) : (
    <BasePage>
      <form
        className={forgotPasswordStyles.form}
        onSubmit={handleSubmit}
      >
        <h2 className='text text_type_main-medium text_color_primary mb-6'>
          Восстановление пароля
        </h2>
        <EmailInput
          name='email'
          onChange={handleInputChange}
          placeholder='Укажите e-mail'
          value={form.email}
          errorText='Ой! Кажется, в Вашем адресе ошибка :('
          extraClass='mb-6'
        />
        <Button
          size='medium'
          htmlType='submit'
          type='primary'
          extraClass='mb-20'
        >
          Восстановить
        </Button>
        <p
          className={`${forgotPasswordStyles.paragraph} text text_type_main-default text_color_inactive mb-4`}
        >
          Вспомнили пароль?
          {
            <Link to='/login'>
              <Button
                size='medium'
                htmlType='button'
                type='secondary'
                extraClass={`${forgotPasswordStyles.button} mb-2`}
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

export default ForgotPasswordPage
