import PropTypes from 'prop-types'

import headerButtonStyles from './header-button.module.scss'

const HeaderButton = ({ text, value, isActive, onClick, icon: Icon }) => {
  const handleClick = () => {
    onClick(value)
  }

  return (
    <button
      type='button'
      className={`${headerButtonStyles.button} pt-4 pr-5 pb-4 pl-5`}
      onClick={handleClick}
    >
      <Icon type={isActive ? 'primary' : 'secondary'} />
      <p
        className={`text text_type_main-default text_color_${
          isActive ? 'primary' : 'inactive'
        } ml-2`}
      >
        {text}
      </p>
    </button>
  )
}

HeaderButton.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.elementType.isRequired,
}

export default HeaderButton
