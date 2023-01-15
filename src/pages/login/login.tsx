import { useCallback, FC, FormEventHandler } from 'react'
import { useDispatch, useForm, useSelector } from 'hooks'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { Location } from 'history'

import {
  Button,
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Loading } from 'components'

import { ILoginForm } from 'services/types/forms'
import { IAuthState } from 'services/reducers/auth'
import { signInThunk } from 'services/actions/auth'

import { getCookie } from 'utils/helpers'

import loginStyles from './login.module.scss'

interface ILocationWithState extends Location {
  state: { from: Location }
}

const LoginPage: FC<{}> = () => {
  const { state }: ILocationWithState = useLocation()
  const history = useHistory()
  const { user, userRequest, userFailed, userError }: IAuthState = useSelector(
    store => store.auth,
  )
  const dispatch = useDispatch()

  const authToken: string | undefined = getCookie('token')

  const { form, handleChange } = useForm<ILoginForm>({
    email: '',
    password: '',
  })

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault()
      dispatch(signInThunk(form))
    },
    [dispatch, form],
  )

  const handleClick = useCallback<(to: string) => () => void>(
    to => () => history.push(to),
    [history],
  )

  return userRequest ? (
    <Loading />
  ) : user || authToken ? (
    <Redirect to={state?.from || '/'} />
  ) : (
    <form
      className={loginStyles.form}
      onSubmit={handleSubmit}
    >
      <h2 className='text text_type_main-medium text_color_primary mb-6'>
        Вход
      </h2>
      <EmailInput
        name='email'
        onChange={handleChange}
        placeholder='E-mail'
        value={form.email}
        {...{ errorText: 'Ой! Кажется, в Вашем адресе ошибка :(' }}
        extraClass='mb-6'
      />
      <PasswordInput
        name='password'
        onChange={handleChange}
        placeholder='Пароль'
        value={form.password}
        extraClass='mb-6'
        {...{ errorText: 'Длина пароля должна составлять минимум 6 символов' }}
      />
      {userFailed && userError !== 'Token is invalid' && (
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
            onClick={handleClick('/register')}
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
          <Button
            size='medium'
            htmlType='button'
            type='secondary'
            extraClass={`${loginStyles.button} mb-2`}
            onClick={handleClick('/forgot-password')}
          >
            Восстановить пароль
          </Button>
        }
      </p>
    </form>
  )
}

export default LoginPage
