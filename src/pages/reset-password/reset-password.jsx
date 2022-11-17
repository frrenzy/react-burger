import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Button,
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import BasePage from 'pages/base'

import resetPasswordStyles from './reset-password.module.scss'

const ResetPasswordPage = () => {
  const [form, setForm] = useState({ code: '', password: '' })

  const handleInputChange = useCallback(
    e => setForm(form => ({ ...form, [e.target.name]: e.target.value })),
    [setForm],
  )

  return (
    <BasePage>
      <form className={resetPasswordStyles.form}>
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
          value={form.email}
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
