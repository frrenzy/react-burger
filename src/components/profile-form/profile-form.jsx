import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm } from 'hooks'

import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { editUser, signOut } from 'services/actions/auth'

import profileFormStyles from './profile-form.module.scss'

const ProfileForm = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  const { form, setForm, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
  })

  const resetForm = useCallback(
    () =>
      setForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
      }),
    [user?.name, user?.email, setForm],
  )

  const isFormChanged = form.name !== user?.name || form.email !== user?.email

  useEffect(() => {
    resetForm()
  }, [resetForm]) //reset form values when stored user changes

  const submitHandler = useCallback(
    e => {
      e.preventDefault()
      dispatch(editUser(form))
      resetForm()
    },
    [dispatch, form, resetForm],
  )

  const resetHandler = useCallback(
    e => {
      e.preventDefault()
      resetForm()
    },
    [resetForm],
  )

  return (
    <form
      className={profileFormStyles.form}
      onSubmit={submitHandler}
      onReset={resetHandler}
    >
      <Input
        name='name'
        onChange={handleChange}
        placeholder='Имя'
        value={form.name}
        extraClass='mb-6'
        icon='EditIcon'
      />
      <EmailInput
        name='email'
        onChange={handleChange}
        placeholder='Логин'
        value={form.email}
        errorText='Ой! Кажется, в Вашем адресе ошибка :('
        extraClass='mb-6'
        icon='EditIcon'
      />
      <PasswordInput
        name='password'
        onChange={handleChange}
        placeholder='Пароль'
        value={form.password}
        extraClass='mb-6'
        icon='EditIcon'
      />
      {(isFormChanged || form.password) && (
        <div className={profileFormStyles.controls}>
          <Button
            size='medium'
            htmlType='reset'
            type='secondary'
            extraClass='mb-20'
          >
            Отмена
          </Button>
          <Button
            size='medium'
            htmlType='submit'
            type='primary'
            extraClass='mb-20'
          >
            Сохранить
          </Button>
        </div>
      )}
    </form>
  )
}

export default ProfileForm
