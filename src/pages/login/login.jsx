import { useCallback, useState } from 'react'

import {
  Button,
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import BasePage from 'pages/base'

import loginStyles from './login.module.scss'

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' })

  const handleInputChange = useCallback(
    e => setForm(form => ({ ...form, [e.target.name]: e.target.value })),
    [setForm],
  )

  return (
    <BasePage>
      <form className={loginStyles.form}>
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
            <Button
              size='medium'
              htmlType='button'
              type='secondary'
              extraClass={`${loginStyles.button} mb-2`}
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
            >
              Восстановить пароль
            </Button>
          }
        </p>
      </form>
    </BasePage>
  )
}

export default LoginPage