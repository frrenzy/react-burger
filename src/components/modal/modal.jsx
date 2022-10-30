import { useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'

import { ModalOverlay, CloseButton } from 'components'
import { RESET_DETAIL } from 'services/actions/detail'

import modalStyles from './modal.module.scss'
import { CLOSE_ORDER_MODAL } from 'services/actions/order'

const Modal = ({ children }) => {
  const modalRoot = document.querySelector('#modal')
  const dispatch = useDispatch()

  const closeModal = useCallback(() => {
    dispatch({ type: RESET_DETAIL })
    dispatch({ type: CLOSE_ORDER_MODAL })
  }, [dispatch])

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
