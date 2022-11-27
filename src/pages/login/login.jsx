import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'

import {
  Button,
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Loading } from 'components'
import { BasePage } from 'pages'

import { signIn } from 'services/actions/auth'
import { getCookie } from 'utils/helpers'

import loginStyles from './login.module.scss'

const LoginPage = () => {
  const { state } = useLocation()
  const history = useHistory()
  const { user, userRequest, userFailed } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  const authToken = getCookie('token')

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

  const handleClick = useCallback(() => history.push('/register'), [history])

  return userRequest ? (
    <Loading />
  ) : user || authToken ? (
    <Redirect to={state?.from || '/'} />
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
          errorText='Длина пароля должна составлять минимум 6 символов'
        />
        {userFailed && (
          <p className={`${loginStyles.error} text text_type_main-default m-4`}>
            Логин или пароль неверны.
          </p>
        )}
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
            <Button
              size='medium'
              htmlType='button'
              type='secondary'
              extraClass={`${loginStyles.button} mb-2`}
              onClick={handleClick}
            >
              Зарегистрироваться
            </Button>
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
