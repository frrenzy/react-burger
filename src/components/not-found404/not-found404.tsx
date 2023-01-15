import { useCallback, FC } from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

import notFound404Styles from './not-found404.module.scss'

const NotFound404: FC = () => {
  const history = useHistory()

  const handleClick = useCallback(() => history.push('/'), [history])
  return (
    <div className={notFound404Styles.container}>
      <p className='text text_type_main-large'>
        Ой! Запрашиваемая страница не найдена :(
      </p>
      <Button
        size='medium'
        htmlType='button'
        type='secondary'
        extraClass={`${notFound404Styles.button} mt-20`}
        onClick={handleClick}
      >
        Вернуться на главную
      </Button>
    </div>
  )
}

export default NotFound404
