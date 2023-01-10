import { useCallback, FC, FormEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'

import { useForm } from 'hooks'

import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Loading } from 'components'

import { registerUser } from 'services/actions/auth'
import { getCookie } from 'utils/helpers'

import registrationStyles from './registration.module.scss'

interface IRegistrationPageForm {
  name: string
  email: string
  password: string
}

const RegistrationPage: FC<{}> = () => {
  const { user, userRequest, userFailed, userError } = useSelector(
    //@ts-ignore
    store => store.auth,
  )
  const dispatch = useDispatch()

  const history = useHistory()

  const authToken = getCookie('token')

  const { form, handleChange } = useForm<IRegistrationPageForm>({
    name: '',
    email: '',
    password: '',
  })

  const submitHandler = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault()
      //@ts-ignore
      dispatch(registerUser(form))
    },
    [dispatch, form],
  )

  const handleClick = useCallback(() => history.push('/login'), [history])

  return userRequest ? (
    <Loading />
  ) : user || authToken ? (
    <Redirect to='/' />
  ) : (
    <form
      className={registrationStyles.form}
      onSubmit={submitHandler}
    >
      <h2 className='text text_type_main-medium text_color_primary mb-6'>
        Регистрация
      </h2>
      <Input
        name='name'
        onChange={handleChange}
        placeholder='Имя'
        value={form?.name ?? ''}
        extraClass='mb-6'
        errorText={userError}
        error={!!userFailed}
      />
      <EmailInput
        name='email'
        onChange={handleChange}
        placeholder='E-mail'
        value={form?.email ?? ''}
        {...{ errorText: 'Ой! Кажется, в Вашем адресе ошибка :(' }}
        extraClass='mb-6'
      />
      <PasswordInput
        name='password'
        onChange={handleChange}
        placeholder='Пароль'
        value={form?.password ?? ''}
        extraClass='mb-6'
        {...{ errorText: 'Длина пароля должна составлять минимум 6 символов' }}
      />
      <Button
        size='medium'
        htmlType='submit'
        type='primary'
        extraClass='mb-20'
      >
        Зарегистрироваться
      </Button>
      <p
        className={`${registrationStyles.paragraph} text text_type_main-default text_color_inactive mb-4`}
      >
        Уже зарегистрированы?
        {
          <Button
            size='medium'
            htmlType='button'
            type='secondary'
            extraClass={`${registrationStyles.button} mb-2`}
            onClick={handleClick}
          >
            Войти
          </Button>
        }
      </p>
    </form>
  )
}

export default RegistrationPage
