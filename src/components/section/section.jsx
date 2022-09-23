import PropTypes from 'prop-types'

import sectionStyles from './section.module.scss'

const Section = ({ children }) => {
  return <section className={sectionStyles.section}>{children}</section>
}

Section.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Section
