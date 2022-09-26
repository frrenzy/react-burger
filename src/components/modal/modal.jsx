import ReactDOM from 'react-dom'
import { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import { ModalOverlay, CloseButton } from 'components'

import modalStyles from './modal.module.scss'

const Modal = ({ isOpen, closeModal, children }) => {
  const modalRoot = document.querySelector('#modal')

  const handleEscape = useCallback(
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
    modalRoot.classList.add('modal_opened')
    return () => modalRoot.classList.remove('modal_opened')
  }, [isOpen, modalRoot])

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

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default Modal
