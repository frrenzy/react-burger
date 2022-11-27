import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'

import { useForm } from 'hooks'

import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { sendResetEmailRequest } from 'api'
import { getCookie } from 'utils/helpers'

import forgotPasswordStyles from './forgot-password.module.scss'

const ForgotPasswordPage = () => {
  const user = useSelector(store => store.auth.user)
  const authToken = getCookie('token')

  const history = useHistory()

  const { form, handleChange } = useForm({ email: '' })
  const [isResetSuccess, setResetSuccess] = useState(false)

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      sendResetEmailRequest(form).then(res => setResetSuccess(true))
    },
    [setResetSuccess, form],
  )

  const handleClick = useCallback(() => history.push('/login'), [history])

  return user || authToken ? (
    <Redirect to='/' />
  ) : isResetSuccess ? (
    <Redirect
      to={{ pathname: '/reset-password', state: { from: 'forgot-password' } }}
    />
  ) : (
    <form
      className={forgotPasswordStyles.form}
      onSubmit={handleSubmit}
    >
      <h2 className='text text_type_main-medium text_color_primary mb-6'>
        Восстановление пароля
      </h2>
      <EmailInput
        name='email'
        onChange={handleChange}
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
          <Button
            size='medium'
            htmlType='button'
            type='secondary'
            extraClass={`${forgotPasswordStyles.button} mb-2`}
            onClick={handleClick}
          >
            Войти
          </Button>
        }
      </p>
    </form>
  )
}

export default ForgotPasswordPage
