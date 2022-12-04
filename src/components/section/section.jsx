import sectionStyles from './section.module.scss'

const Section = ({ children }) => {
  return <section className={sectionStyles.section}>{children}</section>
}

export default Section
