import { useEffect, useCallback, FC, FormEventHandler } from 'react'
import { useDispatch, useForm, useSelector } from 'hooks'

import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { editUserThunk } from 'services/actions/auth'
import { IAuthState } from 'services/reducers/auth'

import { IEditUserForm } from 'services/types/forms'

import profileFormStyles from './profile-form.module.scss'

const ProfileForm: FC = () => {
  const { user }: IAuthState = useSelector(store => store.auth)
  const dispatch = useDispatch()

  const { form, setForm, handleChange } = useForm<IEditUserForm>({
    name: '',
    email: '',
    password: '',
  })

  const resetForm = useCallback<() => void>(
    () =>
      setForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
      }),
    [user?.name, user?.email, setForm],
  )

  const isFormChanged = form?.name !== user?.name || form?.email !== user?.email

  useEffect(() => {
    resetForm()
  }, [resetForm]) //reset form values when stored user changes

  const submitHandler = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault()
      dispatch(editUserThunk(form))
      resetForm()
    },
    [dispatch, form, resetForm],
  )

  const resetHandler = useCallback<FormEventHandler<HTMLFormElement>>(
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
        value={form?.name ?? ''}
        extraClass='mb-6'
        icon='EditIcon'
      />
      <EmailInput
        name='email'
        onChange={handleChange}
        placeholder='Логин'
        value={form?.email ?? ''}
        {
          ...{ errorText: 'Ой! Кажется, в Вашем адресе ошибка :(' } //to override error text which is not present in EmailInput interface
        }
        extraClass='mb-6'
        isIcon={true}
      />
      <PasswordInput
        name='password'
        onChange={handleChange}
        placeholder='Пароль'
        value={form?.password ?? ''}
        extraClass='mb-6'
        icon='EditIcon'
      />
      {(isFormChanged || form?.password) && (
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
