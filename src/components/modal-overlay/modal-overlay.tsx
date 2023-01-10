import { FC } from 'react'

import type { TCloseModalCallback } from 'components'

import modalOverlayStyles from './modal-overlay.module.scss'

interface IModalOverlayProps {
  onClick: TCloseModalCallback
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={modalOverlayStyles.overlay}
    ></div>
  )
}

export default ModalOverlay
