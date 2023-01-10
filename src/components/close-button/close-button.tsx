import { FC, ButtonHTMLAttributes } from 'react'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import closeButtonStyles from './close-button.module.scss'

export type TCloseModalCallback = () => void

interface ICloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: TCloseModalCallback
}

const CloseButton: FC<ICloseButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={closeButtonStyles.button}
    >
      <CloseIcon type='primary' />
    </button>
  )
}

export default CloseButton
