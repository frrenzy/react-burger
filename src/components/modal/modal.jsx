import ReactDOM from 'react-dom'
import { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import { ModalOverlay } from 'components'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import modalStyles from './modal.module.scss'

const Modal = ({ isOpen, onClick, children }) => {
  const modalRoot = document.querySelector('#modal')

  const closeModal = useCallback(() => onClick(false), [onClick])
  const handleEscape = useCallback(
    evt => {
      if (evt.key === 'Escape') {
        onClick(false)
      }
    },
    [onClick],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscape)

    return () => document.removeEventListener('keydown', handleEscape)
  }, [handleEscape])

  useEffect(() => {
    if (isOpen) {
      modalRoot.classList.add('modal_opened')
    } else {
      modalRoot.classList.remove('modal_opened')
    }
  }, [isOpen, modalRoot])

  const modalWrapper = (
    <>
      <ModalOverlay onClick={closeModal} />
      <div className={modalStyles.container}>
        <button
          onClick={closeModal}
          className={modalStyles.button}
        >
          <CloseIcon type='primary' />
        </button>
        {children}
      </div>
    </>
  )

  return isOpen && ReactDOM.createPortal(modalWrapper, modalRoot)
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Modal
