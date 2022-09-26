import ReactDOM from 'react-dom'
import { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { ModalOverlay } from 'components'

import modalStyles from './modal.module.scss'

const Modal = ({ isOpen, setOpen, children }) => {
  const modalRoot = document.querySelector('#modal')

  const closeModal = useCallback(() => setOpen(false), [setOpen])
  const handleEscape = useCallback(
    evt => {
      if (evt.key === 'Escape') {
        setOpen(false)
      }
    },
    [setOpen],
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
  setOpen: PropTypes.func.isRequired,
}

export default Modal
