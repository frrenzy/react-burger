import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import BasePage from 'pages/base'

import registrationStyles from './registration.module.scss'

const RegistrationPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleInputChange = useCallback(
    e => setForm(form => ({ ...form, [e.target.name]: e.target.value })),
    [setForm],
  )

  return (
    <BasePage>
      <form className={registrationStyles.form}>
        <h2 className='text text_type_main-medium text_color_primary mb-6'>
          Регистрация
        </h2>
        <Input
          name='name'
          onChange={handleInputChange}
          placeholder='Имя'
          value={form.name}
          extraClass='mb-6'
        />
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
          Зарегистрироваться
        </Button>
        <p
          className={`${registrationStyles.paragraph} text text_type_main-default text_color_inactive mb-4`}
        >
          Уже зарегистрированы?
          {
            <Link to='/login'>
              <Button
                size='medium'
                htmlType='button'
                type='secondary'
                extraClass={`${registrationStyles.button} mb-2`}
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

export default RegistrationPage
