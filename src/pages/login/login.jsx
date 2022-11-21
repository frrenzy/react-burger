import { useCallback, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import {
  Button,
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import BasePage from 'pages/base'

import loginStyles from './login.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from 'services/actions/auth'

const LoginPage = () => {
  const user = useSelector(store => store.auth.user)
  const dispatch = useDispatch()

  const [form, setForm] = useState({ email: '', password: '' })

  const handleInputChange = useCallback(
    e => setForm(form => ({ ...form, [e.target.name]: e.target.value })),
    [setForm],
  )

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      dispatch(signIn(form))
    },
    [dispatch, form],
  )

  return user ? (
    <Redirect to='/' />
  ) : (
    <BasePage>
      <form
        className={loginStyles.form}
        onSubmit={handleSubmit}
      >
        <h2 className='text text_type_main-medium text_color_primary mb-6'>
          Вход
        </h2>
        <EmailInput
          name='email'
          onChange={handleInputChange}
          placeholder='E-mail'
          value={form.email}
          errorText='Ой! Кажется, в Вашем адресе ошибка :('
          extraClass='mb-6'
        />
        <PasswordInput
          name='password'
          onChange={handleInputChange}
          placeholder='Пароль'
          value={form.password}
          extraClass='mb-6'
        />
        <Button
          size='medium'
          htmlType='submit'
          type='primary'
          extraClass='mb-20'
        >
          Войти
        </Button>
        <p
          className={`${loginStyles.paragraph} text text_type_main-default text_color_inactive mb-4`}
        >
          Вы - новый пользователь?
          {
            <Link to='/register'>
              <Button
                size='medium'
                htmlType='button'
                type='secondary'
                extraClass={`${loginStyles.button} mb-2`}
              >
                Зарегистрироваться
              </Button>
            </Link>
          }
        </p>
        <p
          className={`${loginStyles.paragraph} text text_type_main-default text_color_inactive mb-4`}
        >
          Забыли пароль?
          {
            <Link to='/forgot-password'>
              <Button
                size='medium'
                htmlType='button'
                type='secondary'
                extraClass={`${loginStyles.button} mb-2`}
              >
                Восстановить пароль
              </Button>
            </Link>
          }
        </p>
      </form>
    </BasePage>
  )
}

export default LoginPage
