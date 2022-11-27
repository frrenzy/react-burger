import PropTypes from 'prop-types'

import loadingStyles from './loading.module.scss'

const Loading = ({ extraClass }) => {
  return <div className={`${loadingStyles.spinner} ${extraClass}`}></div>
}

Loading.propTypes = {
  extraClass: PropTypes.string,
}

export default Loading
