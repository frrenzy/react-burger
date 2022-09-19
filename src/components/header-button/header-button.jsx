import headerButtonStyles from './header-button.module.scss'

const HeaderButton = ({ text, children }) => {
  return (
    <button
      type='button'
      className={`${headerButtonStyles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}
    >
      {children}
      <p className='text text_type_main-default text_color_primary ml-2'>
        {text}
      </p>
    </button>
  )
}

export default HeaderButton
