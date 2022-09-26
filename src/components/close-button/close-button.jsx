import PropTypes from 'prop-types'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import closeButtonStyles from './close-button.module.scss'

const CloseButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={closeButtonStyles.button}
    >
      <CloseIcon type='primary' />
    </button>
  )
}

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default CloseButton
