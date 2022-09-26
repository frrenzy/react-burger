import PropTypes from 'prop-types'

import modalOverlayStyles from './modal-overlay.module.scss'

const ModalOverlay = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={modalOverlayStyles.overlay}
    ></div>
  )
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default ModalOverlay
