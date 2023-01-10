import { useCallback, useEffect, FC, ReactNode } from 'react'
import ReactDOM from 'react-dom'

import { ModalOverlay, CloseButton } from 'components'
import type { TCloseModalCallback } from 'components'

import modalStyles from './modal.module.scss'

interface IModalProps {
  closeModal: TCloseModalCallback
  children: ReactNode
}

const Modal: FC<IModalProps> = ({ closeModal, children }) => {
  const modalRoot: HTMLDivElement = document.querySelector('#modal')!

  const handleEscape = useCallback<(evt: KeyboardEvent) => void>(
    evt => {
      if (evt.key === 'Escape') {
        closeModal()
      }
    },
    [closeModal],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [handleEscape])

  useEffect(() => {
    modalRoot?.classList.add('modal_opened')
    return () => modalRoot?.classList.remove('modal_opened')
  }, [])

  const modalWrapper = (
    <>
      <ModalOverlay onClick={closeModal} />
      <div className={modalStyles.container}>
        <CloseButton onClick={closeModal} />
        {children}
      </div>
    </>
  )

  return ReactDOM.createPortal(modalWrapper, modalRoot)
}

export default Modal
